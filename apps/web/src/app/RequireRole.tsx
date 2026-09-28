import { Navigate, Outlet } from 'react-router'
import { getUserRole, useSession, type UserRole } from '../features/auth'
import { paths } from '../lib/paths'
import { homePathFor } from './homePath'

type RequireRoleProps = {
  role: UserRole
}

/**
 * Layout route that only renders its children for signed-in users with `role`; others go to
 * their own home. Read the session in children with `useSignedInSession()`.
 */
export function RequireRole({ role }: RequireRoleProps) {
  const { session, isLoading } = useSession()

  if (isLoading) return null
  if (!session) return <Navigate to={paths.login} replace />

  // UX only: data access is enforced by RLS (`public.is_admin()`), not by this redirect.
  const userRole = getUserRole(session)
  if (userRole !== role) return <Navigate to={homePathFor(userRole)} replace />

  return <Outlet context={session} />
}
