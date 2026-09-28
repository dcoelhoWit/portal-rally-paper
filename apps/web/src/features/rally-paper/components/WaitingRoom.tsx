import { LiveIndicator } from '../../../components'
import { EventHero, type RallyEventSummary } from '../../events'

type WaitingRoomProps = {
  event: RallyEventSummary
}

/** Shown to a registered team on event day until the admin starts its race. */
export function WaitingRoom({ event }: WaitingRoomProps) {
  return (
    <div className="space-y-6">
      <EventHero event={event} />
      <section
        aria-labelledby="waiting-room-heading"
        className="space-y-2 rounded-2xl border border-surface-variant/40 bg-surface-container-low p-6 shadow-lg"
      >
        <div className="flex items-center gap-3">
          <LiveIndicator />
          <h2
            id="waiting-room-heading"
            className="font-headline text-lg font-semibold tracking-tight text-on-surface"
          >
            Sala de espera
          </h2>
        </div>
        <p className="font-body text-sm text-on-surface-variant">
          A sua equipa está inscrita. Aguarde que a organização dê início à sua prova — esta
          página avança automaticamente.
        </p>
      </section>
    </div>
  )
}
