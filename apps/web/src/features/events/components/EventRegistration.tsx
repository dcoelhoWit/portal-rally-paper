import { Button, Icon, Tag } from '../../../components'
import { useEventRegistration } from '../hooks/useEventRegistration'

type EventRegistrationProps = {
  eventId: string
  /** Used in the buttons' accessible names, e.g. "Inscrever em <name>". */
  eventName: string
  teamId: string
  isRegistered: boolean
  isPast: boolean
  onChange: (isRegistered: boolean) => void
}

/** The team's registration status in an event, with the action to change it. */
export function EventRegistration({
  eventId,
  eventName,
  teamId,
  isRegistered,
  isPast,
  onChange,
}: EventRegistrationProps) {
  const { register, cancel, isPending, error } = useEventRegistration({
    eventId,
    teamId,
    onChange,
  })

  return (
    <div className="border-t border-surface-variant/30 pt-4">
      {isPast ? (
        <div className="flex flex-wrap items-center gap-2">
          <Tag tone="muted">Terminado</Tag>
          {isRegistered && <RegisteredTag />}
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
    </div>
  )
}

function RegisteredTag() {
  return (
    <Tag tone="success" icon="check_circle">
      Inscrito
    </Tag>
  )
}
