/** Placeholder for `EventHero` while the event loads. */
export function EventHeroSkeleton() {
  return (
    <>
      <p role="status" className="sr-only">
        A carregar…
      </p>
      <div aria-hidden="true" className="space-y-4 motion-safe:animate-pulse">
        <div className="aspect-21/9 w-full rounded-2xl bg-surface-container-low" />
        <div className="h-8 w-2/3 rounded bg-surface-variant/60" />
        <div className="h-4 w-1/2 rounded bg-surface-variant/40" />
      </div>
    </>
  )
}
