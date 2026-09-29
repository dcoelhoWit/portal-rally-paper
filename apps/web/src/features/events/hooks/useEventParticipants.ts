import { useCallback } from 'react'
import type { ParticipantProgress } from '../types'
import { listEventParticipants } from '../api/participants'
import { useAsyncData } from '../../../lib/useAsyncData'

/** Loads the teams registered in `eventId`. */
export function useEventParticipants(eventId: string) {
  const load = useCallback(() => listEventParticipants(eventId), [eventId])
  const { state, reload, updateData } = useAsyncData(load)

  /** Applies a progress change the server accepted to one team's row, without refetching. */
  const updateProgress = useCallback(
    (teamId: string, progress: ParticipantProgress) =>
      updateData((participants) =>
        participants.map((participant) =>
          participant.teamId === teamId ? { ...participant, ...progress } : participant,
        ),
      ),
    [updateData],
  )

  return { state, reload, updateProgress }
}
