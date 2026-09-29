import { listAllEvents } from '../api/events'
import { useAsyncData } from '../../../lib/useAsyncData'

/** Loads every event, without registration data (the admin's view). */
export function useAllEvents() {
  // `listAllEvents` is a module-level function, so it's already stable.
  const { state, reload } = useAsyncData(listAllEvents)
  return { state, reload }
}
