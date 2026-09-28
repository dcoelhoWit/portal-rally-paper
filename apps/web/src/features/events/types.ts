import type { Tables } from '@portal/supabase'

/** A rally event row. Named `RallyEvent` so it doesn't shadow the DOM `Event` global. */
export type RallyEvent = Tables<'events'>

/** An event ready to display: `image` (a storage path) resolved to a public URL. */
export type RallyEventSummary = RallyEvent & { imageUrl: string | null }

/** An event as a team sees it on the dashboard: plus whether the signed-in team is registered in it. */
export type RallyEventView = RallyEventSummary & { isRegistered: boolean }

/** A team registered in an event, as the admin sees it. */
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

export type EventParticipant = ParticipantProgress & {
  teamId: string
  teamName: string
  /** ISO timestamp of the registration. */
  registeredAt: string
}
