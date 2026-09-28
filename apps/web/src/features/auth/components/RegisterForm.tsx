import { useState, type FormEvent } from 'react'
import { Button, Icon, PasswordField, TextField } from '../../../components'
import { useRegister, type RegisterError } from '../hooks/useRegister'
import { TEAM_NAME_MAX_LENGTH, validateRegistration, type RegistrationErrors } from '../validation'
import { AuthErrorAlert } from './AuthErrorAlert'
import { RegistrationSuccess } from './RegistrationSuccess'

/** Maps server-side failures onto the field they concern; `unknown` goes to the alert instead. */
function toFieldErrors(error: RegisterError | null): RegistrationErrors & { email?: string } {
  switch (error?.kind) {
    case 'teamNameTaken':
      return { teamName: 'Este nome de equipa já está registado.' }
    case 'emailTaken':
      return { email: 'Já existe uma conta com este e-mail.' }
    case 'weakPassword':
      return {
        password: 'A palavra-passe é demasiado fraca. Escolha uma mais difícil de adivinhar.',
      }
    default:
      return {}
  }
}

export function RegisterForm() {
  const { register, isLoading, error, registeredEmail } = useRegister()
  const [teamName, setTeamName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [validationErrors, setValidationErrors] = useState<RegistrationErrors>({})

  if (registeredEmail) return <RegistrationSuccess email={registeredEmail} />

  // A failed client-side check means the last server response is about stale input.
  const hasValidationErrors = Object.keys(validationErrors).length > 0
  const serverError = hasValidationErrors ? null : error
  const fieldErrors = { ...toFieldErrors(serverError), ...validationErrors }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const errors = validateRegistration({ teamName, email, password, passwordConfirmation })
    setValidationErrors(errors)
    if (Object.keys(errors).length > 0) return
    void register({ teamName, email, password })
  }

  return (
    <div>
      {serverError?.kind === 'unknown' && (
        <AuthErrorAlert title="Não foi possível criar a conta" message={serverError.message} />
      )}
      <form onSubmit={handleSubmit}>
        {/* A disabled fieldset disables every control inside it while the request is in flight. */}
        <fieldset disabled={isLoading} className="space-y-5">
          <TextField
            label="Nome da equipa"
            leadingIcon="groups"
            name="teamName"
            autoComplete="organization"
            placeholder="Ex: Os Aventureiros"
            required
            maxLength={TEAM_NAME_MAX_LENGTH}
            value={teamName}
            onChange={(event) => setTeamName(event.target.value)}
            error={fieldErrors.teamName}
          />
          <TextField
            label="E-mail"
            leadingIcon="sports_motorsports"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Ex: condutor@rally.com"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={fieldErrors.email}
          />
          <PasswordField
            label="Palavra-passe"
            leadingIcon="key"
            name="password"
            autoComplete="new-password"
            placeholder="Introduzir palavra-passe"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={fieldErrors.password}
          />
          <PasswordField
            label="Confirmar palavra-passe"
            leadingIcon="key"
            name="passwordConfirmation"
            autoComplete="new-password"
            placeholder="Repetir palavra-passe"
            required
            value={passwordConfirmation}
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            error={fieldErrors.passwordConfirmation}
          />
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
            Criar conta
          </Button>
        </fieldset>
      </form>
    </div>
  )
}
