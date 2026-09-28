import { AppHeader } from '../../../components'
import { SessionActions } from '../../auth'
import { EventGrid } from '../../events'

type DashboardProps = {
  email: string
  /** The signed-in team's id (= its auth user id). */
  teamId: string
}

export function Dashboard({ email, teamId }: DashboardProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader title="Portal Rally Paper" actions={<SessionActions email={email} />} />
      <main className="mx-auto w-full max-w-6xl flex-1 p-4 sm:p-6 lg:p-8">
        <section aria-labelledby="events-heading" className="space-y-4">
          <h2
            id="events-heading"
            className="font-headline text-lg font-semibold tracking-tight text-on-surface"
          >
            Eventos
          </h2>
          <EventGrid teamId={teamId} />
        </section>
      </main>
    </div>
  )
}
