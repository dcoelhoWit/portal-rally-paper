import { useId, type ReactNode } from 'react'
import { Icon } from '../../../components'
import { formatEventDate } from '../format'
import type { RallyEventSummary } from '../types'
import { DifficultyIndicator } from './DifficultyIndicator'

type EventCardProps = {
  event: RallyEventSummary
  /** The card's bottom row (e.g. registration status and buttons), shown below a divider. */
  actions?: ReactNode
}

/** An event's image, name, difficulty, date and location. */
export function EventCard({ event, actions }: EventCardProps) {
  const { name, difficulty, date, location, imageUrl } = event
  const titleId = useId()

  return (
    <article
      aria-labelledby={titleId}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-surface-variant/40 bg-surface-container-low shadow-lg transition-colors duration-300 hover:border-primary-container/40"
    >
      {imageUrl ? (
        <img src={imageUrl} alt={name} loading="lazy" className="aspect-video w-full object-cover" />
      ) : (
        <div
          aria-hidden="true"
          className="flex aspect-video w-full items-center justify-center bg-surface-container-lowest"
        >
          <Icon name="landscape" className="text-4xl text-on-surface-variant/40" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3
          id={titleId}
          className="line-clamp-2 font-headline text-lg font-semibold tracking-tight text-on-surface"
        >
          {name}
        </h3>
        <DifficultyIndicator level={difficulty} />
        <div className="mt-auto space-y-1.5 font-body text-sm text-on-surface-variant">
          <p className="flex items-center gap-2">
            <Icon name="calendar_month" className="shrink-0 text-lg" />
            <time dateTime={date}>{formatEventDate(date)}</time>
          </p>
          <p className="flex items-center gap-2">
            <Icon name="location_on" className="shrink-0 text-lg" />
            <span className="truncate">{location}</span>
          </p>
        </div>
        {actions && <div className="border-t border-surface-variant/30 pt-4">{actions}</div>}
      </div>
    </article>
  )
}
