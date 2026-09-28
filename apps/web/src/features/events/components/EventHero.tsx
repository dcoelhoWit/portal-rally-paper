import { Icon } from '../../../components'
import { formatEventDate } from '../format'
import type { RallyEventSummary } from '../types'
import { DifficultyIndicator } from './DifficultyIndicator'

type EventHeroProps = {
  event: RallyEventSummary
}

/** The event hero: banner image (if any), name, difficulty, date and location. */
export function EventHero({ event }: EventHeroProps) {
  const { name, difficulty, date, location, imageUrl } = event

  return (
    <div className="space-y-4">
      {imageUrl && (
        <div className="relative aspect-21/9 w-full overflow-hidden rounded-2xl border border-surface-variant/40 bg-surface-container-lowest shadow-lg">
          {/* Decorative: the event name is the heading right below. */}
          <img
            src={imageUrl}
            alt=""
            className="absolute inset-0 size-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-linear-to-t from-surface-container-lowest via-surface-container-lowest/40 to-transparent" />
        </div>
      )}
      <h1 className="font-headline text-2xl font-bold tracking-tight text-on-surface sm:text-3xl">
        {name}
      </h1>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-body text-sm text-on-surface-variant">
        <DifficultyIndicator level={difficulty} />
        <p className="flex items-center gap-2">
          <Icon name="calendar_month" className="shrink-0 text-lg" />
          <time dateTime={date}>{formatEventDate(date)}</time>
        </p>
        <p className="flex items-center gap-2">
          <Icon name="location_on" className="shrink-0 text-lg" />
          <span>{location}</span>
        </p>
      </div>
    </div>
  )
}
