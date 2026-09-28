export function LiveStatusBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface-container-lowest/80 px-3 py-1 font-label text-xs tracking-wider text-secondary uppercase backdrop-blur-md">
      <span aria-hidden="true" className="relative flex size-2">
        <span className="absolute inline-flex size-full rounded-full bg-secondary opacity-75 motion-safe:animate-ping" />
        <span className="relative inline-flex size-2 rounded-full bg-secondary" />
      </span>
      <span>ONLINE</span>
    </div>
  )
}
