import { Navigate, useParams } from 'react-router'
import { EventEntryPage } from '../../features/rally-paper'
import { paths } from '../../lib/paths'
import { useSignedInSession } from '../useSignedInSession'

export function EventEntryRoute() {
  const { eventId } = useParams()
  const session = useSignedInSession()

  if (!eventId) return <Navigate to={paths.home} replace />
  // Keyed so moving to another event starts from a fresh loading state.
  return (
    <EventEntryPage
      key={eventId}
      eventId={eventId}
      teamId={session.user.id}
      email={session.user.email ?? 'utilizador desconhecido'}
    />
  )
}
