import { useCallback } from 'react'
import { listEventParticipants } from '../api/participants'
import { useAsyncData } from './useAsyncData'

/** Loads the teams registered in `eventId`. */
export function useEventParticipants(eventId: string) {
  const load = useCallback(() => listEventParticipants(eventId), [eventId])
  const { state, reload } = useAsyncData(load)
  return { state, reload }
}
