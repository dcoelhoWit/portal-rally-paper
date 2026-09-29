import { EmptyState, ErrorPanel } from '../../../components'
import { useZones } from '../hooks/useZones'
import { ZoneCard } from './ZoneCard'
import { ZoneListSkeleton } from './ZoneListSkeleton'

type ZoneListProps = {
  eventId: string
}

/** The event's zones in order, each with its clue. */
export function ZoneList({ eventId }: ZoneListProps) {
  const { state, reload } = useZones(eventId)

  if (state.status === 'loading') return <ZoneListSkeleton />

  if (state.status === 'error') {
    return (
      <ErrorPanel
        title="Não foi possível carregar as zonas"
        message={state.message}
        onRetry={reload}
      />
    )
  }

  if (state.data.length === 0) {
    return <EmptyState icon="map">Esta prova ainda não tem zonas.</EmptyState>
  }

  return (
    <ol className="space-y-4">
      {state.data.map((zone, index) => (
        <li key={zone.id}>
          <ZoneCard zone={zone} position={index + 1} />
        </li>
      ))}
    </ol>
  )
}
