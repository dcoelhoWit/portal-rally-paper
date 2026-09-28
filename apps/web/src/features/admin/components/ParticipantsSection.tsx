import type { AsyncState, EventParticipant } from '../../events'
import { formatParticipantCount } from '../participantCount'
import { ParticipantsSectionBody } from './ParticipantsSectionBody'

type ParticipantsSectionProps = {
  state: AsyncState<EventParticipant[]>
  onRetry: () => void
}

/** The "Participantes" section: how many teams are registered, and which. */
export function ParticipantsSection({ state, onRetry }: ParticipantsSectionProps) {
  return (
    <section aria-labelledby="participants-heading" className="space-y-4">
      <div className="space-y-1">
        <h2
          id="participants-heading"
          className="font-headline text-lg font-semibold tracking-tight text-on-surface"
        >
          Participantes
        </h2>
        {state.status === 'success' && state.data.length > 0 && (
          <p className="font-body text-sm text-on-surface-variant">
            {formatParticipantCount(state.data.length)}
          </p>
        )}
      </div>
      <ParticipantsSectionBody state={state} onRetry={onRetry} />
    </section>
  )
}
