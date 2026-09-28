import { useId } from 'react'
import { Icon } from '../../../components'
import { isPastEvent } from '../dates'
import { formatEventDate } from '../format'
import type { RallyEventView } from '../types'
import { DifficultyIndicator } from './DifficultyIndicator'
import { EventRegistration } from './EventRegistration'

type EventCardProps = {
  event: RallyEventView
  teamId: string
  onRegistrationChange: (eventId: string, isRegistered: boolean) => void
}

export function EventCard({ event, teamId, onRegistrationChange }: EventCardProps) {
  const { id, name, difficulty, date, location, imageUrl, isRegistered } = event
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
        <EventRegistration
          eventId={id}
          eventName={name}
          teamId={teamId}
          isRegistered={isRegistered}
          isPast={isPastEvent(date)}
          onChange={(nowRegistered) => onRegistrationChange(id, nowRegistered)}
        />
      </div>
    </article>
  )
}
