import { BackLink } from '../../../components'
import { paths } from '../../../lib/paths'
import { AdminLayout } from './AdminLayout'
import { EventParticipantsContent } from './EventParticipantsContent'

type EventParticipantsListProps = {
  eventId: string
  /** The signed-in admin's email, shown in the header. */
  email: string
}

/** The admin page with an event's details and the teams registered in it. */
export function EventParticipantsList({ eventId, email }: EventParticipantsListProps) {
  return (
    <AdminLayout email={email}>
      <div className="space-y-6">
        <BackLink to={paths.admin}>Voltar aos eventos</BackLink>
        <EventParticipantsContent eventId={eventId} />
      </div>
    </AdminLayout>
  )
}
