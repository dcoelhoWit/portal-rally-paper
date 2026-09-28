import { supabase } from '../../../lib/supabase'
import type { RallyEventView } from '../types'

const EVENT_IMAGES_BUCKET = 'event-images'

/**
 * Lists every event, soonest first, flagging the ones `teamId` is registered in.
 * The embedded registrations are filtered by team explicitly: RLS alone would let an
 * admin see every team's rows. Throws the Supabase error on failure.
 */
export async function listEvents(teamId: string): Promise<RallyEventView[]> {
  const { data, error } = await supabase
    .from('events')
    .select('id, name, difficulty, image, date, location, created_at, participants(team_id)')
    .eq('participants.team_id', teamId)
    .order('date', { ascending: true })
  if (error) throw error
  return data.map(
    ({ participants, ...event }): RallyEventView => ({
      ...event,
      imageUrl: event.image ? getEventImageUrl(event.image) : null,
      isRegistered: participants.length > 0,
    }),
  )
}

/** Public URL of an object in the (public) event images bucket. */
function getEventImageUrl(path: string): string {
  return supabase.storage.from(EVENT_IMAGES_BUCKET).getPublicUrl(path).data.publicUrl
}
