import type { Tables } from '@portal/supabase'

/** A rally event row. Named `RallyEvent` so it doesn't shadow the DOM `Event` global. */
export type RallyEvent = Tables<'events'>

/** An event ready to display: `image` (a storage path) resolved to a public URL. */
export type RallyEventSummary = RallyEvent & { imageUrl: string | null }

/** An event as a team sees it on the dashboard: plus whether the signed-in team is registered in it. */
export type RallyEventView = RallyEventSummary & { isRegistered: boolean }

/** A team registered in an event, as the admin sees it. */
export type EventParticipant = {
  teamId: string
  teamName: string
  /** ISO timestamp of the registration. */
  registeredAt: string
}
