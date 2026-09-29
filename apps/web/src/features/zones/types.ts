import type { Tables } from '@portal/supabase'
import type { ClueKind } from './clueKind'

/** A zone of an event's rally paper, with its clue ready to show. */
export type Zone = Pick<Tables<'zones'>, 'id' | 'name'> & {
  /** `null` if the clue's file type isn't one the app can show. */
  clueKind: ClueKind | null
  /** Signed URL of the clue in the private bucket, or `null` if signing it failed. */
  clueUrl: string | null
}
