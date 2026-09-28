import { useId, type ComponentProps, type FormEvent, type InputEvent, type ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Icon } from './Icon'

export type TextFieldProps = ComponentProps<'input'> & {
  label: string
  /** Rendered on the right of the label row, e.g. a "Forgot password?" link. */
  labelAction?: ReactNode
  /** Material Symbols name shown inside the field on the left. */
  leadingIcon?: string
  /** Rendered inside the field on the right, e.g. a visibility toggle. */
  trailing?: ReactNode
  error?: string
  /** Replaces the browser's native "Please fill out this field" message. */
  requiredMessage?: string
}

export function TextField({
  label,
  labelAction,
  leadingIcon,
  trailing,
  error,
  requiredMessage = 'Campo obrigatório',
  onInvalid,
  onInput,
  id,
  className,
  'aria-describedby': ariaDescribedBy,
  ...rest
}: TextFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`
  const describedBy = cn(ariaDescribedBy, error && errorId) || undefined

  function handleInvalid(event: FormEvent<HTMLInputElement>) {
    if (event.currentTarget.validity.valueMissing) {
      event.currentTarget.setCustomValidity(requiredMessage)
    }
    onInvalid?.(event)
  }

  function handleInput(event: InputEvent<HTMLInputElement>) {
    // Clear the custom message so the browser re-validates the new value.
    event.currentTarget.setCustomValidity('')
    onInput?.(event)
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={inputId}
          className="font-label text-xs font-semibold tracking-wider text-on-surface uppercase"
        >
          {label}
        </label>
        {labelAction}
      </div>
      <div className="group relative flex items-center rounded-xl">
        {leadingIcon && (
          <Icon
            name={leadingIcon}
            className="pointer-events-none absolute left-3.5 text-lg text-on-surface-variant/70 transition-colors duration-300 group-focus-within:text-primary-container"
          />
        )}
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onInvalid={handleInvalid}
          onInput={handleInput}
          className={cn(
            'w-full rounded-xl border bg-surface-container-lowest py-3 font-body text-sm text-on-surface transition-all duration-300 placeholder:text-on-surface-variant/40 focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60',
            leadingIcon ? 'pl-11' : 'pl-4',
            trailing ? 'pr-11' : 'pr-4',
            error
              ? 'border-error/40 focus:border-error focus:ring-error'
              : 'border-surface-variant/60 focus:border-primary-container focus:ring-primary-container',
            className,
          )}
          {...rest}
        />
        {trailing && <div className="absolute right-3.5 flex items-center">{trailing}</div>}
      </div>
      {error && (
        <p id={errorId} className="mt-1 flex items-center gap-1.5 font-body text-xs text-error">
          <Icon name="error" className="text-sm" />
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}
