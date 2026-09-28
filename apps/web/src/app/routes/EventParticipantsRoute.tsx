import { Navigate, useParams } from 'react-router'
import { EventParticipantsList } from '../../features/admin'
import { paths } from '../../lib/paths'
import { useSignedInSession } from '../useSignedInSession'

export function EventParticipantsRoute() {
  const { eventId } = useParams()
  const session = useSignedInSession()

  if (!eventId) return <Navigate to={paths.admin} replace />
  // Keyed so moving to another event starts from a fresh loading state.
  return (
    <EventParticipantsList
      key={eventId}
      eventId={eventId}
      email={session.user.email ?? 'utilizador desconhecido'}
    />
  )
}
