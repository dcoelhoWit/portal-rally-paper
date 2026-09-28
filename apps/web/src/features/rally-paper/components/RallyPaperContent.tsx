import { EmptyState, ErrorPanel } from '../../../components'
import { EventHero, EventHeroSkeleton, useEvent } from '../../events'
import { getUnavailableReason } from '../availability'
import { RallyPaperSheet } from './RallyPaperSheet'
import { RallyPaperUnavailable } from './RallyPaperUnavailable'

type RallyPaperContentProps = {
  eventId: string
  teamId: string
}

/** Loads the event and shows the rally paper, or why it can't be shown. */
export function RallyPaperContent({ eventId, teamId }: RallyPaperContentProps) {
  const { state, reload } = useEvent(eventId, teamId)

  if (state.status === 'loading') return <EventHeroSkeleton />
  if (state.status === 'error') {
    return (
      <ErrorPanel
        title="Não foi possível carregar o evento"
        message={state.message}
        onRetry={reload}
      />
    )
  }
  if (state.status === 'notFound') {
    return <EmptyState icon="search_off">Este evento não existe.</EmptyState>
  }

  const { event } = state
  const unavailableReason = getUnavailableReason(event)
  if (unavailableReason) {
    return <RallyPaperUnavailable reason={unavailableReason} date={event.date} />
  }

  return (
    <div className="space-y-6">
      <EventHero event={event} />
      <RallyPaperSheet />
    </div>
  )
}
