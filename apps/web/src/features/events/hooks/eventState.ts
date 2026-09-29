import type { AsyncState } from '../../../lib/useAsyncData'

/** Loading one event by id, where a missing event is its own state rather than an error. */
export type EventState<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'notFound' }
  | { status: 'success'; event: T }

export function toEventState<T>(state: AsyncState<T | null>): EventState<T> {
  if (state.status !== 'success') return state
  return state.data ? { status: 'success', event: state.data } : { status: 'notFound' }
}
