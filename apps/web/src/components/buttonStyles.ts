import { cn } from '../lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger'
export type ButtonSize = 'md' | 'sm'

type ButtonClassNameOptions = {
  variant: ButtonVariant
  size: ButtonSize
  className?: string
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'group bg-primary-container font-headline font-semibold text-white shadow-lg transition-all duration-300 hover:bg-inverse-primary hover:shadow-primary-container/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-90',
  secondary:
    'border border-surface-variant/50 bg-surface-container-lowest font-body text-on-surface transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-60',
  success:
    'group bg-success font-headline font-semibold text-on-success shadow-lg transition-all duration-300 hover:bg-success/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-90',
  danger:
    'group bg-error-container font-headline font-semibold text-on-error-container shadow-lg transition-all duration-300 hover:bg-error-container/80 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-90',
}

// The medium size differs per variant (a prominent primary/success, a discreet secondary);
// the small size is the same compact shape for all.
const sizeClasses: Record<ButtonSize, Record<ButtonVariant, string>> = {
  md: {
    primary: 'gap-2.5 rounded-xl px-6 py-3.5 text-base',
    secondary: 'gap-2.5 rounded-xl px-4 py-2.5 text-xs',
    success: 'gap-2.5 rounded-xl px-6 py-3.5 text-base',
    danger: 'gap-2.5 rounded-xl px-6 py-3.5 text-base',
  },
  sm: {
    primary: 'gap-2 rounded-lg px-3 py-2 text-sm',
    secondary: 'gap-2 rounded-lg px-3 py-2 text-sm',
    success: 'gap-2 rounded-lg px-3 py-2 text-sm',
    danger: 'gap-2 rounded-lg px-3 py-2 text-sm',
  },
}

/** Classes for anything that looks like a button, so `Button` and `ButtonLink` stay identical. */
export function buttonClassName({ variant, size, className }: ButtonClassNameOptions): string {
  return cn(
    'flex items-center justify-center',
    variantClasses[variant],
    sizeClasses[size][variant],
    className,
  )
}
