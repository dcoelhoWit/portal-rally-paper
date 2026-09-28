import { useEffect, useState } from 'react'
import { onAuthStateChange } from '../api/auth'
import type { Session } from '../types'

type SessionState = { isLoading: true; session: null } | { isLoading: false; session: Session | null }

export function useSession(): SessionState {
  const [state, setState] = useState<SessionState>({ isLoading: true, session: null })

  useEffect(() => onAuthStateChange((session) => setState({ isLoading: false, session })), [])

  return state
}
