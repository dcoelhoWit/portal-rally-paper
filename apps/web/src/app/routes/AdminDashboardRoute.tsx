import { AdminDashboard } from '../../features/admin'
import { useSignedInSession } from '../useSignedInSession'

export function AdminDashboardRoute() {
  const session = useSignedInSession()
  return <AdminDashboard email={session.user.email ?? 'utilizador desconhecido'} />
}
