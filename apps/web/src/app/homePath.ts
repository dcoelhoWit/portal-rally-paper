import type { UserRole } from '../features/auth'
import { paths } from '../lib/paths'

/** Where each role lands after signing in, and where it's sent back to from the other's pages. */
export function homePathFor(role: UserRole): string {
  return role === 'admin' ? paths.admin : paths.home
}
