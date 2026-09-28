import type { Tables } from '@portal/supabase'
import { supabase } from '../../../lib/supabase'
import type { RallyEvent, RallyEventSummary, RallyEventView } from '../types'

const EVENT_IMAGES_BUCKET = 'event-images'

const EVENT_COLUMNS = 'id, name, difficulty, image, date, location, created_at'

// The embedded registrations are filtered by team explicitly: RLS alone would let an
// admin see every team's rows.
const EVENT_WITH_REGISTRATION = `${EVENT_COLUMNS}, participants(team_id)`

// Postgres invalid_text_representation: e.g. a malformed uuid typed into the URL.
const INVALID_TEXT_REPRESENTATION = '22P02'

type EventWithRegistrationRow = RallyEvent & {
  participants: Pick<Tables<'participants'>, 'team_id'>[]
}

/**
 * Lists every event, soonest first, flagging the ones `teamId` is registered in.
 * Throws the Supabase error on failure.
 */
export async function listEvents(teamId: string): Promise<RallyEventView[]> {
  const { data, error } = await supabase
    .from('events')
    .select(EVENT_WITH_REGISTRATION)
    .eq('participants.team_id', teamId)
    .order('date', { ascending: true })
  if (error) throw error
  return data.map(toView)
}

/**
 * One event with `teamId`'s registration flag, or `null` if it doesn't exist (or the id
 * isn't a valid uuid). Throws the Supabase error on any other failure.
 */
export async function getEvent(eventId: string, teamId: string): Promise<RallyEventView | null> {
  const { data, error } = await supabase
    .from('events')
    .select(EVENT_WITH_REGISTRATION)
    .eq('participants.team_id', teamId)
    .eq('id', eventId)
    .maybeSingle()
  if (error) {
    if (error.code === INVALID_TEXT_REPRESENTATION) return null
    throw error
  }
  return data ? toView(data) : null
}

/** Lists every event, soonest first, without registration data. Throws the Supabase error on failure. */
export async function listAllEvents(): Promise<RallyEventSummary[]> {
  const { data, error } = await supabase
    .from('events')
    .select(EVENT_COLUMNS)
    .order('date', { ascending: true })
  if (error) throw error
  return data.map(toSummary)
}

/**
 * One event, or `null` if it doesn't exist (or the id isn't a valid uuid). Throws the
 * Supabase error on any other failure.
 */
export async function getEventSummary(eventId: string): Promise<RallyEventSummary | null> {
  const { data, error } = await supabase
    .from('events')
    .select(EVENT_COLUMNS)
    .eq('id', eventId)
    .maybeSingle()
  if (error) {
    if (error.code === INVALID_TEXT_REPRESENTATION) return null
    throw error
  }
  return data ? toSummary(data) : null
}

function toSummary(event: RallyEvent): RallyEventSummary {
  return { ...event, imageUrl: event.image ? getEventImageUrl(event.image) : null }
}

function toView({ participants, ...event }: EventWithRegistrationRow): RallyEventView {
  return { ...toSummary(event), isRegistered: participants.length > 0 }
}

/** Public URL of an object in the (public) event images bucket. */
function getEventImageUrl(path: string): string {
  return supabase.storage.from(EVENT_IMAGES_BUCKET).getPublicUrl(path).data.publicUrl
}
