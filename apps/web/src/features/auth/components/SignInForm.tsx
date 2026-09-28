import { useState, type FormEvent } from 'react'
import { Button, Checkbox, Icon, PasswordField, TextField } from '../../../components'
import { useSignIn } from '../hooks/useSignIn'
import { AuthErrorAlert } from './AuthErrorAlert'
import { SignInErrorActions } from './SignInErrorActions'

export function SignInForm() {
  const { signIn, isLoading, error } = useSignIn()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // TODO: not wired to session persistence yet; Supabase currently always persists the session.
  const [rememberDevice, setRememberDevice] = useState(true)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void signIn(email, password)
  }

  return (
    <div>
      {error && (
        <AuthErrorAlert
          title="Authentication failed"
          message={error.message}
          actions={<SignInErrorActions />}
        />
      )}
      <form onSubmit={handleSubmit}>
        {/* A disabled fieldset disables every control inside it while the request is in flight. */}
        <fieldset disabled={isLoading} className="space-y-5">
          <TextField
            label="e-mail"
            leadingIcon="sports_motorsports"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Ex: condutor@rally.com"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <PasswordField
            label="Palavra-passe"
            labelAction={
              // TODO: link to the password-reset flow once it exists.
              <a
                href="#"
                className="font-label text-xs text-tertiary transition-colors hover:text-tertiary-fixed"
              >
                Esqueceu-se da palavra-passe?
              </a>
            }
            leadingIcon="key"
            name="password"
            autoComplete="current-password"
            placeholder="Introduzir palavra-passe"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={error?.isInvalidCredentials ? 'Check your password. It is case-sensitive.' : undefined}
          />
          <div className="flex items-center justify-between pt-0.5">
            <Checkbox
              label="Lembrar password para este dispositivo"
              checked={rememberDevice}
              onChange={(event) => setRememberDevice(event.target.checked)}
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            loading={isLoading}
            className="w-full"
            trailingIcon={
              <Icon
                name="arrow_forward"
                className="text-lg transition-transform group-hover:translate-x-1"
              />
            }
          >
            {error ? 'Tentar Novamente' : 'Entrar'}
          </Button>
        </fieldset>
      </form>
    </div>
  )
}
