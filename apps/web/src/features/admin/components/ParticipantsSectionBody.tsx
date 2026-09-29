import { EmptyState, ErrorPanel } from '../../../components'
import type { AsyncState } from '../../../lib/useAsyncData'
import type { EventParticipant, ParticipantProgress } from '../../events'
import { ParticipantsTable } from './ParticipantsTable'

type ParticipantsSectionBodyProps = {
  eventId: string
  state: AsyncState<EventParticipant[]>
  onRetry: () => void
  onProgressChange: (teamId: string, progress: ParticipantProgress) => void
}

/** The participants' loading, error or empty state, or the table. */
export function ParticipantsSectionBody({
  eventId,
  state,
  onRetry,
  onProgressChange,
}: ParticipantsSectionBodyProps) {
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
    return <EmptyState icon="groups">Não há equipas inscritas neste evento.</EmptyState>
  }

  return (
    <ParticipantsTable
      eventId={eventId}
      participants={state.data}
      onProgressChange={onProgressChange}
    />
  )
}
