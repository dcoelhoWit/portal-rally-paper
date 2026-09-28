const PLACEHOLDER_COUNT = 6
const PLACEHOLDERS = Array.from({ length: PLACEHOLDER_COUNT }, (_, index) => index)

export function EventGridSkeleton() {
  return (
    <>
      <p role="status" className="sr-only">
        A carregar eventos…
      </p>
      <ul aria-hidden="true" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PLACEHOLDERS.map((index) => (
          <li
            key={index}
            className="overflow-hidden rounded-2xl border border-surface-variant/40 bg-surface-container-low motion-safe:animate-pulse"
          >
            <div className="aspect-video w-full bg-surface-container-lowest" />
            <div className="space-y-3 p-5">
              <div className="h-5 w-3/4 rounded bg-surface-variant/60" />
              <div className="h-3 w-1/2 rounded bg-surface-variant/40" />
              <div className="h-3 w-2/3 rounded bg-surface-variant/40" />
              <div className="h-3 w-1/3 rounded bg-surface-variant/40" />
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
