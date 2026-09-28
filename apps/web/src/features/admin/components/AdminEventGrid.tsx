import { ButtonLink, Icon } from '../../../components'
import { adminEventParticipantsPath } from '../../../lib/paths'
import { EventCardGrid, useAllEvents } from '../../events'

/** Every event, each linking to its participants page. */
export function AdminEventGrid() {
  const { state, reload } = useAllEvents()

  return (
    <EventCardGrid
      state={state}
      onRetry={reload}
      renderActions={(event) => (
        <ButtonLink
          to={adminEventParticipantsPath(event.id)}
          variant="success"
          size="sm"
          leadingIcon={<Icon name="flag" className="text-lg" />}
          aria-label={`Ver participantes de ${event.name}`}
          className="w-full"
        >
          Entrar
        </ButtonLink>
      )}
    />
  )
}
