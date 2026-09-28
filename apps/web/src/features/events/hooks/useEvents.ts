import { useCallback } from 'react'
import { listEvents } from '../api/events'
import type { ParticipantProgress } from '../types'
import { useAsyncData } from './useAsyncData'

// The column defaults of a freshly inserted `participants` row.
const NEW_REGISTRATION: ParticipantProgress = { status: 'waiting', startTime: null, endTime: null }

/** Loads the events grid for `teamId`, with the team's registration and progress in each. */
export function useEvents(teamId: string) {
  const load = useCallback(() => listEvents(teamId), [teamId])
  const { state, reload, updateData } = useAsyncData(load)

  /** Reflects a registration change the server already accepted, without refetching. */
  const setRegistered = useCallback(
    (eventId: string, isRegistered: boolean) => {
      updateData((events) =>
        events.map((event) =>
          event.id === eventId
            ? { ...event, isRegistered, participation: isRegistered ? NEW_REGISTRATION : null }
            : event,
        ),
      )
    },
    [updateData],
  )

  return { state, reload, setRegistered }
}
