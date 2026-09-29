import { useCallback } from 'react'
import { useAsyncData } from '../../../lib/useAsyncData'
import { listZones } from '../api/zones'

/** Loads `eventId`'s zones with their clues. */
export function useZones(eventId: string) {
  const load = useCallback(() => listZones(eventId), [eventId])
  const { state, reload } = useAsyncData(load)
  return { state, reload }
}
