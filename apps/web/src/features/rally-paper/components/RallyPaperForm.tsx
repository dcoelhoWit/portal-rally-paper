import { Icon } from '../../../components'
import { EventHero, formatTimeOfDay, type RallyEventSummary } from '../../events'
import { RallyPaperSheet } from './RallyPaperSheet'

type RallyPaperFormProps = {
  event: RallyEventSummary
  /** When the admin started the team's race ('HH:MM:SS'). */
  startTime: string | null
}

/** The race in progress: where the team takes the event's rally paper. */
export function RallyPaperForm({ event, startTime }: RallyPaperFormProps) {
  return (
    <div className="space-y-6">
      <EventHero event={event} />
      {startTime && (
        <p className="flex items-center gap-2 font-body text-sm text-on-surface-variant">
          <Icon name="schedule" className="shrink-0 text-lg" />
          <span>
            Prova iniciada às <time dateTime={startTime}>{formatTimeOfDay(startTime)}</time>
          </span>
        </p>
      )}
      <RallyPaperSheet />
    </div>
  )
}
