import { cn } from '../lib/cn'

type IconProps = {
  /** Material Symbols Outlined ligature name, e.g. `arrow_forward`. */
  name: string
  className?: string
}

export function Icon({ name, className }: IconProps) {
  return (
    <span aria-hidden="true" className={cn('material-symbols-outlined select-none', className)}>
      {name}
    </span>
  )
}
