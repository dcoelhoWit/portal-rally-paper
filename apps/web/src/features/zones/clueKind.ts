export type ClueKind = 'image' | 'audio'

// Keep in sync with the `zones_clue_path_supported_type` constraint in
// supabase/migrations/20260929110926_allow_audio_zone_clues.sql.
const CLUE_KIND_BY_EXTENSION = new Map<string, ClueKind>([
  ['jpg', 'image'],
  ['jpeg', 'image'],
  ['png', 'image'],
  ['webp', 'image'],
  ['mp3', 'audio'],
  ['m4a', 'audio'],
  ['aac', 'audio'],
  ['wav', 'audio'],
])

/** How a clue is shown, from its file extension (case-insensitive); `null` if unsupported. */
export function getClueKind(path: string): ClueKind | null {
  const dot = path.lastIndexOf('.')
  if (dot === -1) return null
  return CLUE_KIND_BY_EXTENSION.get(path.slice(dot + 1).toLowerCase()) ?? null
}
