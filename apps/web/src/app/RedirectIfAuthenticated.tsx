import { Navigate, Outlet } from 'react-router'
import { getUserRole, useSession } from '../features/auth'
import { homePathFor } from './homePath'

/** Layout route for signed-out screens (login, registration); signed-in users go to their home. */
export function RedirectIfAuthenticated() {
  const { session, isLoading } = useSession()

  if (isLoading) return null
  if (session) return <Navigate to={homePathFor(getUserRole(session))} replace />
  return <Outlet />
}
