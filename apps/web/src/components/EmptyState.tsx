import type { ReactNode } from 'react'
import { Icon } from './Icon'

type EmptyStateProps = {
  /** Material Symbols name shown above the text. */
  icon: string
  /**
   * Rendered as the page's main heading (`h1`): only for panels that replace a page's
   * whole content, e.g. "Prova indisponível".
   */
  title?: string
  children: ReactNode
}

/** A muted panel explaining why there is nothing to show. */
export function EmptyState({ icon, title, children }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-surface-variant/40 bg-surface-container-low px-6 py-12 text-center">
      <Icon name={icon} className="text-4xl text-on-surface-variant/50" />
      {title && (
        <h1 className="font-headline text-lg font-semibold tracking-tight text-on-surface">
          {title}
        </h1>
      )}
      <p className="font-body text-sm text-on-surface-variant">{children}</p>
    </div>
  )
}
