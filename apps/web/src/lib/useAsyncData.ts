import { useCallback, useEffect, useState } from 'react'
import { getErrorMessage } from './errors'

export type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: T }

/** One run of the fetch effect; a new object re-runs it. */
type FetchRequest = {
  /** A background refetch keeps the current data on screen, even if it fails. */
  isBackground: boolean
}

/**
 * Runs `load` on mount and whenever it changes, tracking loading / error / success.
 * `load` must be stable between renders (wrap it in `useCallback`), or it refetches every render.
 * `mergeRefresh` (also stable) combines the data on screen with a background refresh's response,
 * e.g. to keep a newer local change the slower response doesn't know about yet.
 */
export function useAsyncData<T>(
  load: () => Promise<T>,
  mergeRefresh?: (current: T, incoming: T) => T,
) {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading' })
  const [request, setRequest] = useState<FetchRequest>({ isBackground: false })

  useEffect(() => {
    // Ignore a response that lands after unmount or after a newer request started.
    let isCurrent = true

    load()
      .then((data) => {
        if (!isCurrent) return
        setState((previous) =>
          request.isBackground && mergeRefresh && previous.status === 'success'
            ? { status: 'success', data: mergeRefresh(previous.data, data) }
            : { status: 'success', data },
        )
      })
      .catch((error: unknown) => {
        if (!isCurrent) return
        if (request.isBackground) console.error('Background refresh failed', error)
        setState((previous) =>
          request.isBackground && previous.status === 'success'
            ? previous
            : { status: 'error', message: getErrorMessage(error) },
        )
      })

    return () => {
      isCurrent = false
    }
  }, [load, mergeRefresh, request])

  /** Refetches from scratch, showing the loading state. */
  const reload = useCallback(() => {
    setState({ status: 'loading' })
    setRequest({ isBackground: false })
  }, [])

  /** Refetches while the current data stays visible; only a successful response replaces it. */
  const refresh = useCallback(() => {
    setRequest({ isBackground: true })
  }, [])

  /** Replaces the loaded data locally (e.g. after a change the server accepted), without refetching. */
  const updateData = useCallback((update: (data: T) => T) => {
    setState((previous) =>
      previous.status === 'success' ? { status: 'success', data: update(previous.data) } : previous,
    )
  }, [])

  return { state, reload, refresh, updateData }
}
