import { useState } from 'react'
import { getTransitionAnnouncement, type EntryViewKind } from '../entryView'

/**
 * The latest screen-reader announcement for a live view change (e.g. the race starting).
 * The first view shown, and changes not worth announcing, leave it as it was.
 */
export function useTransitionAnnouncement(kind: EntryViewKind | null): string {
  const [previousKind, setPreviousKind] = useState(kind)
  const [announcement, setAnnouncement] = useState('')

  // Adjusting state while rendering (instead of in an effect) avoids a render with stale text.
  if (kind !== previousKind) {
    setPreviousKind(kind)
    const next = getTransitionAnnouncement(previousKind, kind)
    if (next) setAnnouncement(next)
  }

  return announcement
}
