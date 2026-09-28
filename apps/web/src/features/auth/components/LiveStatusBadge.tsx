import { LiveIndicator } from '../../../components'

export function LiveStatusBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface-container-lowest/80 px-3 py-1 font-label text-xs tracking-wider text-secondary uppercase backdrop-blur-md">
      <LiveIndicator />
      <span>ONLINE</span>
    </div>
  )
}
