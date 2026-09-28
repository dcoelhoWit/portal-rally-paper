import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Icon } from './Icon'

type TagTone = 'success' | 'muted'

type TagProps = {
  tone: TagTone
  /** Material Symbols name shown before the text. */
  icon?: string
  children: ReactNode
}

const toneClasses: Record<TagTone, string> = {
  success: 'border-tertiary/30 bg-tertiary/10 text-tertiary',
  muted: 'border-surface-variant/40 bg-surface-container-lowest text-on-surface-variant',
}

/** A small, non-interactive status label, e.g. "Inscrito". */
export function Tag({ tone, icon, children }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-label text-xs tracking-wider uppercase',
        toneClasses[tone],
      )}
    >
      {icon && <Icon name={icon} className="text-sm" />}
      {children}
    </span>
  )
}
