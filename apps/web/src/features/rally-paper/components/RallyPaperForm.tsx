import { AppHeader, BackLink } from '../../../components'
import { paths } from '../../../lib/paths'
import { SignOutButton } from '../../auth'
import { RallyPaperContent } from './RallyPaperContent'

type RallyPaperFormProps = {
  eventId: string
  /** The signed-in team's id (= its auth user id). */
  teamId: string
}

/** The event-day page where a registered team takes an event's rally paper. */
export function RallyPaperForm({ eventId, teamId }: RallyPaperFormProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader title="Portal Rally Paper" actions={<SignOutButton />} />
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 p-4 sm:p-6 lg:p-8">
        <BackLink to={paths.home}>Voltar aos eventos</BackLink>
        <RallyPaperContent eventId={eventId} teamId={teamId} />
      </main>
    </div>
  )
}
