import { useEffect, useRef } from 'react'
import { subscribeToParticipation } from '../api/participants'
import type { ParticipantProgress } from '../types'

type UseParticipationUpdatesOptions = {
  eventId: string
  teamId: string
  /** Listens only while true, e.g. while the race can still change. */
  enabled: boolean
  onChange: (progress: ParticipantProgress) => void
  /** Called on every (re)subscription: refetch here to catch changes made while not listening. */
  onSubscribed: () => void
}

/** Follows `teamId`'s race progress in `eventId` live while `enabled`. */
export function useParticipationUpdates({
  eventId,
  teamId,
  enabled,
  onChange,
  onSubscribed,
}: UseParticipationUpdatesOptions) {
  // The latest callbacks, so passing new ones doesn't tear down and recreate the channel.
  const onChangeRef = useRef(onChange)
  const onSubscribedRef = useRef(onSubscribed)
  useEffect(() => {
    onChangeRef.current = onChange
    onSubscribedRef.current = onSubscribed
  })

  useEffect(() => {
    if (!enabled) return
    return subscribeToParticipation(eventId, teamId, {
      onChange: (progress) => onChangeRef.current(progress),
      onSubscribed: () => onSubscribedRef.current(),
    })
  }, [eventId, teamId, enabled])
}
