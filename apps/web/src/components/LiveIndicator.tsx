/** A pulsing dot signalling something live. Decorative: pair it with visible text. */
export function LiveIndicator() {
  return (
    <span aria-hidden="true" className="relative flex size-2">
      <span className="absolute inline-flex size-full rounded-full bg-secondary opacity-75 motion-safe:animate-ping" />
      <span className="relative inline-flex size-2 rounded-full bg-secondary" />
    </span>
  )
}
