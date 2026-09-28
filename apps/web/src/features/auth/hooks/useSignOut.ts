import { useCallback, useState } from 'react'
import { getErrorMessage } from '../../../lib/errors'
import { signOut as signOutRequest } from '../api/auth'

export function useSignOut() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const signOut = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      // On success the session listener redirects to the login page; nothing else to do here.
      await signOutRequest()
    } catch (signOutError) {
      setError(getErrorMessage(signOutError))
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { signOut, isLoading, error }
}
