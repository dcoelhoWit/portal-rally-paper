import { Navigate, useParams } from 'react-router'
import { RallyPaperForm } from '../../features/rally-paper'
import { paths } from '../../lib/paths'
import { useSignedInSession } from '../useSignedInSession'

export function RallyPaperRoute() {
  const { eventId } = useParams()
  const session = useSignedInSession()

  if (!eventId) return <Navigate to={paths.home} replace />
  // Keyed so moving to another event starts from a fresh loading state.
  return <RallyPaperForm key={eventId} eventId={eventId} teamId={session.user.id} />
}
