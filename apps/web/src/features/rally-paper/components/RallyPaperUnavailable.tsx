import { EmptyState } from '../../../components'
import { formatEventDate } from '../../events'
import type { UnavailableReason } from '../entryView'

type RallyPaperUnavailableProps = {
  reason: UnavailableReason
  /** The event's date ('YYYY-MM-DD'), shown when it isn't today. */
  date: string
}

export function RallyPaperUnavailable({ reason, date }: RallyPaperUnavailableProps) {
  return (
    <EmptyState icon="event_busy" title="Prova indisponível">
      {reason === 'notRegistered' && 'A sua equipa não está inscrita neste evento.'}
      {reason === 'eventOver' && 'Esta prova já terminou.'}
      {reason === 'notToday' &&
        `Esta prova só está disponível no dia do evento (${formatEventDate(date)}).`}
    </EmptyState>
  )
}
