import { AppHeader, BackLink } from '../../../components'
import { paths } from '../../../lib/paths'
import { SignOutButton } from '../../auth'
import { EventEntryContent } from './EventEntryContent'

type EventEntryPageProps = {
  eventId: string
  /** The signed-in team's id (= its auth user id). */
  teamId: string
  /** The signed-in team's email, shown in the header. */
  email: string
}

/** The event-day page where a registered team waits for, takes and finishes its race. */
export function EventEntryPage({ eventId, teamId, email }: EventEntryPageProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader title="Portal Rally Paper" subtitle={email} actions={<SignOutButton />} />
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 p-4 sm:p-6 lg:p-8">
        <BackLink to={paths.home}>Voltar aos eventos</BackLink>
        <EventEntryContent eventId={eventId} teamId={teamId} />
      </main>
    </div>
  )
}
