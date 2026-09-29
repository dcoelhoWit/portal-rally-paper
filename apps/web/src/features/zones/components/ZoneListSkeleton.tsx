/** Placeholder for `ZoneList` while the zones load. */
export function ZoneListSkeleton() {
  return (
    <>
      <p role="status" className="sr-only">
        A carregar as zonas…
      </p>
      <div aria-hidden="true" className="space-y-4 motion-safe:animate-pulse">
        {[1, 2].map((key) => (
          <div key={key} className="space-y-3 rounded-xl bg-surface-container p-4">
            <div className="h-3 w-16 rounded bg-surface-variant/40" />
            <div className="h-5 w-1/2 rounded bg-surface-variant/60" />
            <div className="aspect-4/3 w-full rounded-lg bg-surface-variant/30" />
          </div>
        ))}
      </div>
    </>
  )
}
