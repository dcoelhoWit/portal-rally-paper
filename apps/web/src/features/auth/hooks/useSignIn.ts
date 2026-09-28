import { useCallback, useState } from 'react'
import { getErrorMessage } from '../../../lib/errors'
import { signInWithPassword } from '../api/auth'
import { getErrorCode } from '../errors'

export type SignInError = {
  message: string
  /** True when Supabase rejected the email/password pair (as opposed to e.g. a network failure). */
  isInvalidCredentials: boolean
}

function toSignInError(error: unknown): SignInError {
  return {
    message: getErrorMessage(error),
    isInvalidCredentials: getErrorCode(error) === 'invalid_credentials',
  }
}

export function useSignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<SignInError | null>(null)

  const signIn = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      await signInWithPassword(email, password)
    } catch (signInError) {
      setError(toSignInError(signInError))
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { signIn, isLoading, error }
}
