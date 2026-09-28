import rallyHeroUrl from '../../../assets/rally-hero.jpg'
import { HeroQuote } from './HeroQuote'
import { LiveStatusBadge } from './LiveStatusBadge'

/** Image panel: a compact banner above the form on small screens, a full column from `lg`. */
export function AuthHero() {
  return (
    <div className="relative flex h-48 flex-col justify-between overflow-hidden bg-surface-container-lowest p-6 lg:col-span-5 lg:h-auto lg:p-8 xl:p-10">
      <img
        src={rallyHeroUrl}
        alt=""
        className="absolute inset-0 size-full scale-105 object-cover opacity-75 transition-transform duration-1000 ease-out hover:scale-100"
      />
      <div className="absolute inset-0 bg-linear-to-t from-surface-container-lowest via-surface-container-lowest/60 to-surface-container-lowest/30" />
      <div className="absolute inset-0 bg-linear-to-r from-transparent to-surface-container-low/70" />
      <div className="relative z-10">
        <LiveStatusBadge />
      </div>
      <div className="relative z-10 hidden lg:block">
        <HeroQuote />
      </div>
    </div>
  )
}
