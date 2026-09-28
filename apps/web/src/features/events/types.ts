import type { Tables } from '@portal/supabase'

/** A rally event row. Named `RallyEvent` so it doesn't shadow the DOM `Event` global. */
export type RallyEvent = Tables<'events'>

/** An event ready to display: `image` (a storage path) resolved to a public URL. */
export type RallyEventSummary = RallyEvent & { imageUrl: string | null }

/** Mirrors the `participants_status_valid` check constraint. */
export const PARTICIPANT_STATUSES = ['waiting', 'in_progress', 'finished'] as const
export type ParticipantStatus = (typeof PARTICIPANT_STATUSES)[number]

/** The race progress fields of a participant, which change as the admin starts/finishes it. */
export type ParticipantProgress = {
  status: ParticipantStatus
  /** Time of day on the event date ('HH:MM:SS'), or null before the team starts. */
  startTime: string | null
  /** Time of day on the event date ('HH:MM:SS'), or null until the team finishes. */
  endTime: string | null
}

/** An event as the signed-in team sees it: plus its registration and race progress in it. */
export type RallyEventView = RallyEventSummary & {
  /** Always `participation !== null`; kept so callers that only care about registration stay simple. */
  isRegistered: boolean
  /** The team's progress in the event, or `null` if it isn't registered. */
  participation: ParticipantProgress | null
}

/** A team registered in an event, as the admin sees it. */
export type EventParticipant = ParticipantProgress & {
  teamId: string
  teamName: string
  /** ISO timestamp of the registration. */
  registeredAt: string
}
