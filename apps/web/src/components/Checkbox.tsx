import type { ComponentProps, ReactNode } from 'react'
import { cn } from '../lib/cn'

type CheckboxProps = Omit<ComponentProps<'input'>, 'type'> & {
  label: ReactNode
}

export function Checkbox({ label, className, ...rest }: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 select-none has-disabled:cursor-not-allowed">
      <input
        type="checkbox"
        className={cn(
          'size-4 rounded accent-primary-container transition-colors disabled:opacity-60',
          className,
        )}
        {...rest}
      />
      <span className="font-body text-xs text-on-surface-variant sm:text-sm">{label}</span>
    </label>
  )
}
