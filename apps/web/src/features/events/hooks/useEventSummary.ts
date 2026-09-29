import { useCallback } from 'react'
import { getEventSummary } from '../api/events'
import { toEventState } from './eventState'
import { useAsyncData } from '../../../lib/useAsyncData'

/** Loads one event, without registration data. */
export function useEventSummary(eventId: string) {
  const load = useCallback(() => getEventSummary(eventId), [eventId])
  const { state, reload } = useAsyncData(load)
  return { state: toEventState(state), reload }
}
