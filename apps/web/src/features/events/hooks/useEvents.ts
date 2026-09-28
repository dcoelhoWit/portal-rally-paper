import { useCallback } from 'react'
import { listEvents } from '../api/events'
import { useAsyncData } from './useAsyncData'

/** Loads the events grid for `teamId`, with each event's registration flag. */
export function useEvents(teamId: string) {
  const load = useCallback(() => listEvents(teamId), [teamId])
  const { state, reload, updateData } = useAsyncData(load)

  /** Reflects a registration change the server already accepted, without refetching. */
  const setRegistered = useCallback(
    (eventId: string, isRegistered: boolean) => {
      updateData((events) =>
        events.map((event) => (event.id === eventId ? { ...event, isRegistered } : event)),
      )
    },
    [updateData],
  )

  return { state, reload, setRegistered }
}
