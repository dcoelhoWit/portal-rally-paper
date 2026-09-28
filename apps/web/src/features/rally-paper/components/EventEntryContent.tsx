import { EmptyState, ErrorPanel } from '../../../components'
import { EventHeroSkeleton } from '../../events'
import { useEventEntry, type EventEntryState } from '../hooks/useEventEntry'
import { RaceFinished } from './RaceFinished'
import { RallyPaperForm } from './RallyPaperForm'
import { RallyPaperUnavailable } from './RallyPaperUnavailable'
import { WaitingRoom } from './WaitingRoom'

type EventEntryContentProps = {
  eventId: string
  teamId: string
}

/** Loads the event and shows the team's race: waiting, in progress, finished, or why not. */
export function EventEntryContent({ eventId, teamId }: EventEntryContentProps) {
  const { state, reload, announcement } = useEventEntry(eventId, teamId)

  return (
    <>
      {/* Always mounted, so screen readers pick up the text changing. */}
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
      <EventEntryView state={state} onRetry={reload} />
    </>
  )
}

type EventEntryViewProps = {
  state: EventEntryState
  onRetry: () => void
}

function EventEntryView({ state, onRetry }: EventEntryViewProps) {
  if (state.status === 'loading') return <EventHeroSkeleton />
  if (state.status === 'error') {
    return (
      <ErrorPanel
        title="Não foi possível carregar o evento"
        message={state.message}
        onRetry={onRetry}
      />
    )
  }
  if (state.status === 'notFound') {
    return <EmptyState icon="search_off">Este evento não existe.</EmptyState>
  }

  const { event, view } = state
  switch (view.kind) {
    case 'notRegistered':
    case 'eventOver':
    case 'notToday':
      return <RallyPaperUnavailable reason={view.kind} date={event.date} />
    case 'waiting':
      return <WaitingRoom event={event} />
    case 'inProgress':
      return <RallyPaperForm event={event} startTime={view.progress.startTime} />
    case 'finished':
      return (
        <RaceFinished
          event={event}
          startTime={view.progress.startTime}
          endTime={view.progress.endTime}
        />
      )
  }
}
