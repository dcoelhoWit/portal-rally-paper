import type { Zone } from '../types'
import { ZoneClue } from './ZoneClue'

type ZoneCardProps = {
  zone: Zone
  /** 1-based position of the zone in the rally paper. */
  position: number
}

/** One zone: its name, then its clue. */
export function ZoneCard({ zone, position }: ZoneCardProps) {
  const headingId = `zone-${zone.id}-heading`

  return (
    <article
      aria-labelledby={headingId}
      className="min-w-0 space-y-3 rounded-xl border border-surface-variant/40 bg-surface-container p-4"
    >
      <header className="min-w-0 space-y-1">
        <p className="font-label text-xs tracking-widest text-on-surface-variant uppercase">
          Zona {position}
        </p>
        <h3
          id={headingId}
          className="font-headline text-base font-semibold tracking-tight break-words text-on-surface"
        >
          {zone.name}
        </h3>
      </header>
      <ZoneClue zone={zone} />
    </article>
  )
}
