import { useParticipationUpdates, useEvent, type RallyEventView } from '../../events'
import { isLiveView, resolveEntryView, type EntryView } from '../entryView'
import { useTransitionAnnouncement } from './useTransitionAnnouncement'

export type EventEntryState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'notFound' }
  | { status: 'success'; event: RallyEventView; view: EntryView }

/**
 * Loads the event for `teamId` and decides what to show, following the race live while it
 * can still change. `announcement` describes the latest live change for screen readers.
 */
export function useEventEntry(eventId: string, teamId: string) {
  const { state: eventState, reload, refresh, updateParticipation } = useEvent(eventId, teamId)
  const state: EventEntryState =
    eventState.status === 'success'
      ? { ...eventState, view: resolveEntryView(eventState.event) }
      : eventState
  const viewKind = state.status === 'success' ? state.view.kind : null

  useParticipationUpdates({
    eventId,
    teamId,
    enabled: viewKind !== null && isLiveView(viewKind),
    onChange: updateParticipation,
    // Background refetch: catches changes made before the channel was listening.
    onSubscribed: refresh,
  })
  const announcement = useTransitionAnnouncement(viewKind)

  return { state, reload, announcement }
}
