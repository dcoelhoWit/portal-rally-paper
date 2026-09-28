import { useCallback, useEffect, useState } from 'react'
import { getErrorMessage } from '../../../lib/errors'

export type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: T }

/**
 * Runs `load` on mount and whenever it changes, tracking loading / error / success.
 * `load` must be stable between renders (wrap it in `useCallback`), or it refetches every render.
 */
export function useAsyncData<T>(load: () => Promise<T>) {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading' })
  // Bumping this re-runs the fetch effect.
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    // Ignore a response that lands after unmount or after a newer request started.
    let isCurrent = true

    load()
      .then((data) => {
        if (isCurrent) setState({ status: 'success', data })
      })
      .catch((error: unknown) => {
        if (isCurrent) setState({ status: 'error', message: getErrorMessage(error) })
      })

    return () => {
      isCurrent = false
    }
  }, [load, attempt])

  const reload = useCallback(() => {
    setState({ status: 'loading' })
    setAttempt((previous) => previous + 1)
  }, [])

  /** Replaces the loaded data locally (e.g. after a change the server accepted), without refetching. */
  const updateData = useCallback((update: (data: T) => T) => {
    setState((previous) =>
      previous.status === 'success' ? { status: 'success', data: update(previous.data) } : previous,
    )
  }, [])

  return { state, reload, updateData }
}
