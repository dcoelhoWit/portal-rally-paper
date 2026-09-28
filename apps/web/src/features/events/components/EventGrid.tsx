import { useEvents } from '../hooks/useEvents'
import { EventCardGrid } from './EventCardGrid'
import { EventRegistration } from './EventRegistration'

type EventGridProps = {
  /** The signed-in team, whose registrations the cards show and change. */
  teamId: string
}

/** The team's events grid, where it registers in and cancels events. */
export function EventGrid({ teamId }: EventGridProps) {
  const { state, reload, setRegistered } = useEvents(teamId)

  return (
    <EventCardGrid
      state={state}
      onRetry={reload}
      renderActions={(event) => (
        <EventRegistration
          event={event}
          teamId={teamId}
          onChange={(isRegistered) => setRegistered(event.id, isRegistered)}
        />
      )}
    />
  )
}
