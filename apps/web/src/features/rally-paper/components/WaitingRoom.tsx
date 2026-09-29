import { Icon, LiveIndicator } from '../../../components'
import { EventHero, type RallyEventSummary } from '../../events'

type WaitingRoomProps = {
  event: RallyEventSummary
}

/** Shown to a registered team on event day until the admin starts its race. */
export function WaitingRoom({ event }: WaitingRoomProps) {
  return (
    <div className="space-y-6">
      {/* First on the page, so on a phone the team sees it's waiting without scrolling. */}
      <section
        aria-labelledby="waiting-room-heading"
        className="flex flex-col items-center gap-4 rounded-2xl border-2 border-secondary/60 bg-secondary/10 px-6 py-10 text-center shadow-lg shadow-secondary/10"
      >
        <span aria-hidden="true" className="relative flex size-20 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-secondary/20 motion-safe:animate-ping" />
          <span className="relative flex size-20 items-center justify-center rounded-full border border-secondary/50 bg-secondary/15">
            <Icon name="hourglass_top" className="text-5xl text-secondary" />
          </span>
        </span>
        <p className="inline-flex items-center gap-2 font-label text-xs tracking-widest text-secondary uppercase">
          <LiveIndicator />
          Sala de espera
        </p>
        <h2
          id="waiting-room-heading"
          className="font-headline text-2xl font-bold tracking-tight text-on-surface sm:text-3xl"
        >
          Na sala de espera
        </h2>
        <p className="max-w-md font-body text-sm text-on-surface-variant sm:text-base">
          Por favor aguardar que a organização dê início à prova — esta
          página avança automaticamente, não é preciso atualizar.
        </p>
      </section>
      <EventHero event={event} />
    </div>
  )
}
