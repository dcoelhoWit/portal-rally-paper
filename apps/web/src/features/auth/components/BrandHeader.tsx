import logoUrl from '../../../assets/prp-logo.png'

type BrandHeaderProps = {
  title: string
  description: string
}

export function BrandHeader({ title, description }: BrandHeaderProps) {
  return (
    <header className="mb-8">
      <div className="mb-4 flex items-center gap-3.5">
        {/* Decorative: the brand name is rendered as text right next to it. */}
        <img src={logoUrl} alt="" className="size-18 shrink-0 object-contain" />
        <div>
          <span className="flex items-center gap-1.5 font-headline text-2xl font-bold tracking-tight text-white">
            Portal Rally Paper
          </span>
          <span className="block font-label text-xs tracking-wider text-on-surface-variant uppercase">
            Diversão, Competição e Descoberta
          </span>
        </div>
      </div>
      <h1 className="font-headline text-xl font-semibold tracking-tight text-on-surface sm:text-2xl">
        {title}
      </h1>
      <p className="mt-1.5 font-body text-sm text-on-surface-variant">{description}</p>
    </header>
  )
}
