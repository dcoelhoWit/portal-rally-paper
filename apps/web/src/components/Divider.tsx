import { cn } from '../lib/cn'

type DividerProps = {
  /** Optional text centred on the rule, e.g. "Or sign in with". */
  label?: string
  className?: string
}

export function Divider({ label, className }: DividerProps) {
  if (!label) {
    return <hr className={cn('border-t border-surface-variant/50', className)} />
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span aria-hidden="true" className="h-px flex-1 bg-surface-variant/50" />
      <span className="font-label text-xs tracking-wider text-on-surface-variant/60 uppercase">
        {label}
      </span>
      <span aria-hidden="true" className="h-px flex-1 bg-surface-variant/50" />
    </div>
  )
}
