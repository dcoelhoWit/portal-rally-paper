import { Button, Icon } from '../../../components'
import { useEvents } from '../hooks/useEvents'
import { EventCard } from './EventCard'
import { EventGridSkeleton } from './EventGridSkeleton'

type EventGridProps = {
  /** The signed-in team, whose registrations the cards show and change. */
  teamId: string
}

export function EventGrid({ teamId }: EventGridProps) {
  const { state, reload, setRegistered } = useEvents(teamId)

  if (state.status === 'loading') return <EventGridSkeleton />

  if (state.status === 'error') {
    return (
      <div
        role="alert"
        className="flex flex-col gap-2 rounded-xl border border-error/40 bg-error-container/40 p-4 text-error shadow-lg"
      >
        <div className="flex items-center gap-2">
          <Icon name="warning" className="shrink-0 text-lg" />
          <span className="font-label text-xs font-bold tracking-wider uppercase">
            Não foi possível carregar os eventos
          </span>
        </div>
        <p className="font-body text-xs leading-relaxed text-on-surface">{state.message}</p>
        <Button
          variant="secondary"
          onClick={reload}
          leadingIcon={<Icon name="refresh" className="text-base" />}
          className="mt-1 self-start"
        >
          Tentar novamente
        </Button>
      </div>
    )
  }

  if (state.events.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-surface-variant/40 bg-surface-container-low px-6 py-12 text-center">
        <Icon name="event" className="text-4xl text-on-surface-variant/50" />
        <p className="font-body text-sm text-on-surface-variant">Ainda não há eventos.</p>
      </div>
    )
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {state.events.map((event) => (
        <li key={event.id}>
          <EventCard event={event} teamId={teamId} onRegistrationChange={setRegistered} />
        </li>
      ))}
    </ul>
  )
}
