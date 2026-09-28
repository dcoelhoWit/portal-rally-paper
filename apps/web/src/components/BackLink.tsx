import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Icon } from './Icon'

type BackLinkProps = {
  to: string
  /** The link text, e.g. "Voltar aos eventos". */
  children: ReactNode
}

/** A discreet "back" link shown above a page's content. */
export function BackLink({ to, children }: BackLinkProps) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1 font-label text-xs text-tertiary transition-colors hover:text-tertiary-fixed"
    >
      <Icon name="arrow_back" className="text-base" />
      {children}
    </Link>
  )
}
