import { useCallback } from 'react'
import { getEvent } from '../api/events'
import { PARTICIPANT_STATUSES, type ParticipantProgress, type RallyEventView } from '../types'
import { toEventState } from './eventState'
import { useAsyncData } from './useAsyncData'

/**
 * Race progress only moves forward (waiting -> in_progress -> finished). A background refresh
 * that started before a live update can answer after it; keep whichever progress is further on.
 */
function keepFurthestProgress(
  current: RallyEventView | null,
  incoming: RallyEventView | null,
): RallyEventView | null {
  const currentProgress = current?.participation
  const incomingProgress = incoming?.participation
  if (!incoming || !currentProgress || !incomingProgress) return incoming
  const isCurrentFurther =
    PARTICIPANT_STATUSES.indexOf(currentProgress.status) >
    PARTICIPANT_STATUSES.indexOf(incomingProgress.status)
  return isCurrentFurther ? { ...incoming, participation: currentProgress } : incoming
}

/** Loads one event for `teamId`, with its registration and race progress. */
export function useEvent(eventId: string, teamId: string) {
  const load = useCallback(() => getEvent(eventId, teamId), [eventId, teamId])
  const { state, reload, refresh, updateData } = useAsyncData(load, keepFurthestProgress)

  /** Applies a progress change the server already made (e.g. from Realtime), without refetching. */
  const updateParticipation = useCallback(
    (participation: ParticipantProgress) =>
      updateData((event) => event && { ...event, isRegistered: true, participation }),
    [updateData],
  )

  return { state: toEventState(state), reload, refresh, updateParticipation }
}
