import type { ReactNode } from 'react'

type AppHeaderProps = {
  title: string
  /** Rendered right after the title, e.g. a role tag. */
  badge?: ReactNode
  /** A line under the title, e.g. the signed-in user's email. Truncated when it doesn't fit. */
  subtitle?: ReactNode
  /** Rendered on the right of the bar, e.g. a sign-out button. */
  actions?: ReactNode
}

/** Top bar for signed-in screens. */
export function AppHeader({ title, badge, subtitle, actions }: AppHeaderProps) {
  return (
    <header className="border-b border-surface-variant/40 bg-surface-container-low">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <span className="font-headline text-lg font-bold tracking-tight text-white">{title}</span>
            {badge}
          </div>
          {subtitle && (
            <p className="truncate font-body text-xs text-on-surface-variant">{subtitle}</p>
          )}
        </div>
        {actions}
      </div>
    </header>
  )
}
