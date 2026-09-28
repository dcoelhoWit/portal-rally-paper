import { Dashboard } from '../../features/dashboard'
import { useSignedInSession } from '../useSignedInSession'

export function DashboardRoute() {
  const session = useSignedInSession()
  return (
    <Dashboard email={session.user.email ?? 'utilizador desconhecido'} teamId={session.user.id} />
  )
}
