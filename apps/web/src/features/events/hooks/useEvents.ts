import { useCallback, useEffect, useState } from 'react'
import { getErrorMessage } from '../../../lib/errors'
import { listEvents } from '../api/events'
import type { RallyEventView } from '../types'

export type EventsState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; events: RallyEventView[] }

/** Loads the events grid for `teamId`, with each event's registration flag. */
export function useEvents(teamId: string) {
  const [state, setState] = useState<EventsState>({ status: 'loading' })
  // Bumping this re-runs the fetch effect.
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    // Ignore a response that lands after unmount or after a newer request started.
    let isCurrent = true

    listEvents(teamId)
      .then((events) => {
        if (isCurrent) setState({ status: 'success', events })
      })
      .catch((error: unknown) => {
        if (isCurrent) setState({ status: 'error', message: getErrorMessage(error) })
      })

    return () => {
      isCurrent = false
    }
  }, [teamId, attempt])

  const reload = useCallback(() => {
    setState({ status: 'loading' })
    setAttempt((previous) => previous + 1)
  }, [])

  /** Reflects a registration change the server already accepted, without refetching. */
  const setRegistered = useCallback((eventId: string, isRegistered: boolean) => {
    setState((previous) => {
      if (previous.status !== 'success') return previous
      return {
        status: 'success',
        events: previous.events.map((event) =>
          event.id === eventId ? { ...event, isRegistered } : event,
        ),
      }
    })
  }, [])

  return { state, reload, setRegistered }
}
