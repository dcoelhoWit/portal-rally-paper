import type { Session, UserRole } from './types'

/**
 * Reads the role from `app_metadata`, which only the server can write, so users can't promote
 * themselves. Anything other than an explicit `admin` is a team account.
 */
export function getUserRole(session: Session): UserRole {
  const role: unknown = session.user.app_metadata.role
  return role === 'admin' ? 'admin' : 'team'
}
