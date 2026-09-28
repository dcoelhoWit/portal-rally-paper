import { EmptyState, ErrorPanel } from '../../../components'
import type { AsyncState, EventParticipant } from '../../events'
import { ParticipantsTable } from './ParticipantsTable'

type ParticipantsSectionBodyProps = {
  state: AsyncState<EventParticipant[]>
  onRetry: () => void
}

/** The participants' loading, error or empty state, or the table. */
export function ParticipantsSectionBody({ state, onRetry }: ParticipantsSectionBodyProps) {
  if (state.status === 'loading') {
    return (
      <p role="status" className="font-body text-sm text-on-surface-variant">
        A carregar participantes…
      </p>
    )
  }

  if (state.status === 'error') {
    return (
      <ErrorPanel
        title="Não foi possível carregar os participantes"
        message={state.message}
        onRetry={onRetry}
      />
    )
  }

  if (state.data.length === 0) {
    return <EmptyState icon="groups">Ainda não há equipas inscritas neste evento.</EmptyState>
  }

  return <ParticipantsTable participants={state.data} />
}
