import type { ComponentProps, ReactNode } from 'react'
import { cn } from '../lib/cn'

type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'md' | 'sm'

type ButtonProps = ComponentProps<'button'> & {
  variant?: ButtonVariant
  /** `sm` is a compact button for dense places such as cards. */
  size?: ButtonSize
  /** Shows a spinner and disables the button. */
  loading?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'group bg-primary-container font-headline font-semibold text-white shadow-lg transition-all duration-300 hover:bg-inverse-primary hover:shadow-primary-container/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-90',
  secondary:
    'border border-surface-variant/50 bg-surface-container-lowest font-body text-on-surface transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-60',
}

// The medium size differs per variant (a prominent primary, a discreet secondary);
// the small size is the same compact shape for both.
const sizeClasses: Record<ButtonSize, Record<ButtonVariant, string>> = {
  md: {
    primary: 'gap-2.5 rounded-xl px-6 py-3.5 text-base',
    secondary: 'gap-2.5 rounded-xl px-4 py-2.5 text-xs',
  },
  sm: {
    primary: 'gap-2 rounded-lg px-3 py-2 text-sm',
    secondary: 'gap-2 rounded-lg px-3 py-2 text-sm',
  },
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  leadingIcon,
  trailingIcon,
  type = 'button',
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        'flex items-center justify-center',
        variantClasses[variant],
        sizeClasses[size][variant],
        className,
      )}
      {...rest}
    >
      {loading ? (
        // `currentColor` so the spinner matches the text of any variant.
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current/30 border-t-current"
        />
      ) : (
        leadingIcon
      )}
      <span className="tracking-wide">{children}</span>
      {!loading && trailingIcon}
    </button>
  )
}
