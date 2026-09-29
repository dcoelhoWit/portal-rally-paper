import { supabase } from '../../../lib/supabase'
import { getClueKind } from '../clueKind'
import type { Zone } from '../types'

const ZONE_CLUES_BUCKET = 'zone-clues'

// Long enough to outlast a whole race: a team may replay an audio clue or reopen an image
// hours after the page loaded, and the page doesn't re-sign URLs while it stays open.
const CLUE_URL_EXPIRES_IN_SECONDS = 12 * 60 * 60

/**
 * Lists `eventId`'s zones in the order they were created, with a signed URL for each clue.
 * RLS returns none until the team's race has started. A clue that can't be signed gets a
 * `null` URL instead of failing the whole list. Throws the Supabase error on any other failure.
 */
export async function listZones(eventId: string): Promise<Zone[]> {
  const { data: zones, error } = await supabase
    .from('zones')
    .select('id, name, clue_path')
    .eq('event_id', eventId)
    .order('created_at', { ascending: true })
    .order('id', { ascending: true })
  if (error) throw error
  if (zones.length === 0) return []

  const clueUrls = await signClueUrls(zones.map((zone) => zone.clue_path))
  return zones.map((zone) => ({
    id: zone.id,
    name: zone.name,
    clueKind: getClueKind(zone.clue_path),
    clueUrl: clueUrls.get(zone.clue_path) ?? null,
  }))
}

/** Signed URLs by object path, in one request; paths that failed to sign are left out. */
async function signClueUrls(paths: string[]): Promise<Map<string, string>> {
  const { data, error } = await supabase.storage
    .from(ZONE_CLUES_BUCKET)
    .createSignedUrls(paths, CLUE_URL_EXPIRES_IN_SECONDS)
  if (error) throw error

  const urls = new Map<string, string>()
  for (const item of data) {
    if (item.error) {
      console.error('Failed to sign zone clue URL', item.path, item.error)
      continue
    }
    if (item.path && item.signedUrl) urls.set(item.path, item.signedUrl)
  }
  return urls
}
