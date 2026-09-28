import type { ReactNode } from 'react'
import { EmptyState, ErrorPanel } from '../../../components'
import type { AsyncState } from '../hooks/useAsyncData'
import type { RallyEventSummary } from '../types'
import { EventCard } from './EventCard'
import { EventGridSkeleton } from './EventGridSkeleton'

type EventCardGridProps<T extends RallyEventSummary> = {
  state: AsyncState<T[]>
  onRetry: () => void
  /** Each card's bottom row, e.g. the team's registration or the admin's "Entrar" link. */
  renderActions: (event: T) => ReactNode
}

/** A grid of event cards, with its loading, error and empty states. */
export function EventCardGrid<T extends RallyEventSummary>({
  state,
  onRetry,
  renderActions,
}: EventCardGridProps<T>) {
  if (state.status === 'loading') return <EventGridSkeleton />

  if (state.status === 'error') {
    return (
      <ErrorPanel
        title="Não foi possível carregar os eventos"
        message={state.message}
        onRetry={onRetry}
      />
    )
  }

  if (state.data.length === 0) return <EmptyState icon="event">Ainda não há eventos.</EmptyState>

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {state.data.map((event) => (
        <li key={event.id}>
          <EventCard event={event} actions={renderActions(event)} />
        </li>
      ))}
    </ul>
  )
}
