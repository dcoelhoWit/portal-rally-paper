import { isEventToday, isPastEvent, type RallyEventView } from '../events'

export type UnavailableReason = 'notRegistered' | 'finished' | 'notToday'

/**
 * Why the team can't take the rally paper of `event` yet, or `null` if it can: only
 * registered teams, only on the event day. UX only; the database must enforce the same.
 */
export function getUnavailableReason(
  event: Pick<RallyEventView, 'isRegistered' | 'date'>,
  today?: string,
): UnavailableReason | null {
  if (!event.isRegistered) return 'notRegistered'
  if (isPastEvent(event.date, today)) return 'finished'
  if (!isEventToday(event.date, today)) return 'notToday'
  return null
}
