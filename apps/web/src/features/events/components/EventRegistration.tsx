import { Button, ButtonLink, Icon, Tag } from '../../../components'
import { rallyPaperPath } from '../../../lib/paths'
import { isEventToday, isPastEvent } from '../dates'
import { useEventRegistration } from '../hooks/useEventRegistration'
import type { RallyEventView } from '../types'

type EventRegistrationProps = {
  event: RallyEventView
  teamId: string
  onChange: (isRegistered: boolean) => void
}

/**
 * The team's registration status in an event, with the action to change it. On event day
 * a registered team enters the rally paper instead of cancelling.
 */
export function EventRegistration({ event, teamId, onChange }: EventRegistrationProps) {
  const { id: eventId, name: eventName, date, isRegistered } = event
  const isPast = isPastEvent(date)
  const isToday = isEventToday(date)
  const { register, cancel, isPending, error } = useEventRegistration({
    eventId,
    teamId,
    onChange,
  })

  return (
    <>
      {isPast ? (
        <div className="flex flex-wrap items-center gap-2">
          <Tag tone="muted">Terminado</Tag>
          {isRegistered && <RegisteredTag />}
        </div>
      ) : isRegistered && isToday ? (
        <div className="flex items-center justify-between gap-3">
          <RegisteredTag />
          <ButtonLink
            to={rallyPaperPath(eventId)}
            variant="success"
            size="sm"
            leadingIcon={<Icon name="flag" className="text-lg" />}
            aria-label={`Entrar em ${eventName}`}
          >
            Entrar
          </ButtonLink>
        </div>
      ) : isRegistered ? (
        <div className="flex items-center justify-between gap-3">
          <RegisteredTag />
          <Button
            variant="secondary"
            size="sm"
            loading={isPending}
            onClick={cancel}
            aria-label={`Cancelar inscrição em ${eventName}`}
          >
            Cancelar inscrição
          </Button>
        </div>
      ) : (
        <Button
          size="sm"
          loading={isPending}
          onClick={register}
          leadingIcon={<Icon name="how_to_reg" className="text-lg" />}
          aria-label={`Inscrever em ${eventName}`}
          className="w-full"
        >
          Inscrever
        </Button>
      )}
      {error && (
        <p role="alert" className="mt-2 font-body text-xs text-error">
          {error}
        </p>
      )}
    </>
  )
}

function RegisteredTag() {
  return (
    <Tag tone="success" icon="check_circle">
      Inscrito
    </Tag>
  )
}
