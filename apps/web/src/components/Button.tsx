import type { ComponentProps, ReactNode } from 'react'
import { buttonClassName, type ButtonSize, type ButtonVariant } from './buttonStyles'

type ButtonProps = ComponentProps<'button'> & {
  variant?: ButtonVariant
  /** `sm` is a compact button for dense places such as cards. */
  size?: ButtonSize
  /** Shows a spinner and disables the button. */
  loading?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
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
      className={buttonClassName({ variant, size, className })}
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
