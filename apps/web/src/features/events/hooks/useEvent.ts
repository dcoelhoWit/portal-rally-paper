import { useCallback } from 'react'
import { getEvent } from '../api/events'
import { toEventState } from './eventState'
import { useAsyncData } from './useAsyncData'

/** Loads one event for `teamId`, with its registration flag. */
export function useEvent(eventId: string, teamId: string) {
  const load = useCallback(() => getEvent(eventId, teamId), [eventId, teamId])
  const { state, reload } = useAsyncData(load)
  return { state: toEventState(state), reload }
}
