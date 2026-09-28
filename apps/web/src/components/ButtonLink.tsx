import type { ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router'
import { buttonClassName, type ButtonSize, type ButtonVariant } from './buttonStyles'

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant
  /** `sm` is a compact button for dense places such as cards. */
  size?: ButtonSize
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

/** A router link that looks like a `Button`, for actions that navigate. */
export function ButtonLink({
  variant = 'primary',
  size = 'md',
  leadingIcon,
  trailingIcon,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link className={buttonClassName({ variant, size, className })} {...rest}>
      {leadingIcon}
      <span className="tracking-wide">{children}</span>
      {trailingIcon}
    </Link>
  )
}
