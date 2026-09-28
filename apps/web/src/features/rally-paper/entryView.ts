import {
  isEventToday,
  isPastEvent,
  type ParticipantProgress,
  type RallyEventView,
} from '../events'

/** Why the team can't enter the race (yet). */
export type UnavailableReason = 'notRegistered' | 'eventOver' | 'notToday'

/** What the event page shows the team. */
export type EntryView =
  | { kind: UnavailableReason }
  | { kind: 'waiting' }
  | { kind: 'inProgress' | 'finished'; progress: ParticipantProgress }

export type EntryViewKind = EntryView['kind']

/**
 * Decides what the team sees for `event`: a finished race always shows its result;
 * otherwise only registered teams, only on the event day, wait for or take the race.
 * UX only; the database must enforce the same.
 */
export function resolveEntryView(
  event: Pick<RallyEventView, 'participation' | 'date'>,
  today?: string,
): EntryView {
  const { participation, date } = event
  if (!participation) return { kind: 'notRegistered' }
  if (participation.status === 'finished') return { kind: 'finished', progress: participation }
  if (isPastEvent(date, today)) return { kind: 'eventOver' }
  if (!isEventToday(date, today)) return { kind: 'notToday' }
  if (participation.status === 'waiting') return { kind: 'waiting' }
  return { kind: 'inProgress', progress: participation }
}

/** Whether the view can still change as the admin starts / finishes the race. */
export function isLiveView(kind: EntryViewKind): boolean {
  return kind === 'waiting' || kind === 'inProgress'
}

/** What to announce to screen readers when the view changes from `from` to `to`, if anything. */
export function getTransitionAnnouncement(
  from: EntryViewKind | null,
  to: EntryViewKind | null,
): string | null {
  if (from === 'waiting' && to === 'inProgress') return 'A prova começou.'
  // Waiting -> finished happens when both changes arrive together (e.g. after a reconnect).
  if ((from === 'inProgress' || from === 'waiting') && to === 'finished') return 'A prova terminou.'
  return null
}
