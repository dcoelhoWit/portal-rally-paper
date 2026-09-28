import { useCallback, useState } from 'react'
import { getErrorMessage } from '../../../lib/errors'
import { isTeamNameAvailable, signUp } from '../api/auth'
import { getErrorCode } from '../errors'
import type { SignUpValues } from '../types'

export type RegisterError =
  | { kind: 'teamNameTaken' }
  | { kind: 'emailTaken' }
  | { kind: 'weakPassword' }
  | { kind: 'unknown'; message: string }

// What GoTrue reports when the `on_auth_user_created` trigger raises. After the
// availability check passed, the only expected cause is another team claiming
// the same name in between (the unique index rejects it).
const TRIGGER_FAILURE_MESSAGE = 'Database error saving new user'

function toRegisterError(error: unknown): RegisterError {
  const code = getErrorCode(error)
  if (code === 'user_already_exists' || code === 'email_exists') return { kind: 'emailTaken' }
  if (code === 'weak_password') return { kind: 'weakPassword' }
  if (error instanceof Error && error.message === TRIGGER_FAILURE_MESSAGE) {
    return { kind: 'teamNameTaken' }
  }
  return { kind: 'unknown', message: getErrorMessage(error) }
}

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<RegisterError | null>(null)
  /** Set when the account was created but must be confirmed by e-mail before signing in. */
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null)

  const register = useCallback(async (values: SignUpValues) => {
    setIsLoading(true)
    setError(null)
    try {
      if (!(await isTeamNameAvailable(values.teamName))) {
        setError({ kind: 'teamNameTaken' })
        return
      }
      const session = await signUp(values)
      // With a session, RedirectIfAuthenticated takes the user in; nothing to do here.
      if (!session) setRegisteredEmail(values.email)
    } catch (registerError) {
      setError(toRegisterError(registerError))
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { register, isLoading, error, registeredEmail }
}
