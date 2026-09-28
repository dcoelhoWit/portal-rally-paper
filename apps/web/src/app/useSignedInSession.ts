import { useOutletContext } from 'react-router'
import type { Session } from '../features/auth'

/** The session `RequireRole` passes down; only valid in routes nested under it. */
export function useSignedInSession(): Session {
  return useOutletContext<Session>()
}
