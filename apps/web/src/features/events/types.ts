import type { Tables } from '@portal/supabase'

/** A rally event row. Named `RallyEvent` so it doesn't shadow the DOM `Event` global. */
export type RallyEvent = Tables<'events'>

/**
 * An event as a team sees it on the dashboard: `image` (a storage path) resolved to a
 * public URL, plus whether the signed-in team is registered in it.
 */
export type RallyEventView = RallyEvent & { imageUrl: string | null; isRegistered: boolean }
