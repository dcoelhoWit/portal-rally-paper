import { EmptyState, ErrorPanel } from '../../../components'
import { EventHero, EventHeroSkeleton, useEventParticipants, useEventSummary } from '../../events'
import { ParticipantsSection } from './ParticipantsSection'

type EventParticipantsContentProps = {
  eventId: string
}

/** Loads the event and its participants (in parallel) and shows them, or why it can't. */
export function EventParticipantsContent({ eventId }: EventParticipantsContentProps) {
  const { state: eventState, reload: reloadEvent } = useEventSummary(eventId)
  const {
    state: participantsState,
    reload: reloadParticipants,
    updateProgress,
  } = useEventParticipants(eventId)

  if (eventState.status === 'loading') return <EventHeroSkeleton />
  if (eventState.status === 'error') {
    return (
      <ErrorPanel
        title="Não foi possível carregar o evento"
        message={eventState.message}
        onRetry={reloadEvent}
      />
    )
  }
  if (eventState.status === 'notFound') {
    return <EmptyState icon="search_off">Este evento não existe.</EmptyState>
  }

  return (
    <div className="space-y-8">
      <EventHero event={eventState.event} />
      <ParticipantsSection
        eventId={eventId}
        state={participantsState}
        onRetry={reloadParticipants}
        onProgressChange={updateProgress}
      />
    </div>
  )
}
