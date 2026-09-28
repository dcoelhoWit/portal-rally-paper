import { useState } from 'react'
import { Icon } from './Icon'
import { TextField, type TextFieldProps } from './TextField'

type PasswordFieldProps = Omit<TextFieldProps, 'type' | 'trailing'>

export function PasswordField({ disabled, ...rest }: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <TextField
      {...rest}
      type={isVisible ? 'text' : 'password'}
      disabled={disabled}
      trailing={
        <button
          type="button"
          onClick={() => setIsVisible((visible) => !visible)}
          disabled={disabled}
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          className="rounded p-0.5 text-on-surface-variant/70 transition-colors hover:text-on-surface disabled:cursor-not-allowed"
        >
          <Icon name={isVisible ? 'visibility_off' : 'visibility'} className="text-lg" />
        </button>
      }
    />
  )
}
