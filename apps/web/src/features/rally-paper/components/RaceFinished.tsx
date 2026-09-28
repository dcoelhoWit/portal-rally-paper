import { Icon } from '../../../components'
import { EventHero, formatTimeOfDay, type RallyEventSummary } from '../../events'

type RaceFinishedProps = {
  event: RallyEventSummary
  /** When the team's race started / ended ('HH:MM:SS'). */
  startTime: string | null
  endTime: string | null
}

/** Shown once the admin has finished the team's race, whatever the date. */
export function RaceFinished({ event, startTime, endTime }: RaceFinishedProps) {
  return (
    <div className="space-y-6">
      <EventHero event={event} />
      <section
        aria-labelledby="race-finished-heading"
        className="flex flex-col items-center gap-2 rounded-2xl border border-success/40 bg-success/10 px-6 py-10 text-center shadow-lg"
      >
        <Icon name="sports_score" className="text-4xl text-success" />
        <h2
          id="race-finished-heading"
          className="font-headline text-lg font-semibold tracking-tight text-on-surface"
        >
          Prova terminada
        </h2>
        <p className="font-label text-sm text-on-surface">
          Início: <TimeOfDay time={startTime} /> · Fim: <TimeOfDay time={endTime} />
        </p>
        <p className="font-body text-sm text-on-surface-variant">Obrigado por participar!</p>
      </section>
    </div>
  )
}

function TimeOfDay({ time }: { time: string | null }) {
  if (!time) {
    return (
      <>
        <span aria-hidden="true">—</span>
        <span className="sr-only">sem registo</span>
      </>
    )
  }
  return <time dateTime={time}>{formatTimeOfDay(time)}</time>
}
