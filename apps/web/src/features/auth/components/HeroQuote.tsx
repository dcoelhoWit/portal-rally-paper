import { Icon } from '../../../components'

export function HeroQuote() {
  return (
    <figure className="space-y-2 rounded-xl border border-white/10 bg-surface-container-lowest/80 p-5 backdrop-blur-md">
      <div className="flex items-center gap-1.5 font-label text-xs tracking-wide text-primary uppercase">
        <Icon name="flag" className="text-sm" />
        Aventura no mundo real
      </div>
      <blockquote className="font-body text-sm leading-relaxed text-on-surface">
        O portal é digital: a corrida é real. Com ajuda do GPS do Portal Rally Paper, todo o processo fica automático e rápido.
      </blockquote>
    </figure>
  )
}
