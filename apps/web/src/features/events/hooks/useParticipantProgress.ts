import { useState } from 'react'
import { finishParticipant, startParticipant } from '../api/participants'
import type { ParticipantProgress } from '../types'

type UseParticipantProgressOptions = {
  eventId: string
  teamId: string
  /** Called with the new progress once the server has accepted the change. */
  onChange: (progress: ParticipantProgress) => void
}

type ProgressRequest =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'error'; message: string }

// Supabase/Postgres messages are English and technical; show a fixed Portuguese one instead.
const START_ERROR = 'Não foi possível iniciar a prova.'
const FINISH_ERROR = 'Não foi possível terminar a prova.'

/** Starts / finishes one team's race (admin only). Not optimistic: `onChange` runs after success. */
export function useParticipantProgress({ eventId, teamId, onChange }: UseParticipantProgressOptions) {
  const [request, setRequest] = useState<ProgressRequest>({ status: 'idle' })

  async function run(action: () => Promise<ParticipantProgress>, errorMessage: string) {
    setRequest({ status: 'pending' })
    let progress: ParticipantProgress
    try {
      progress = await action()
    } catch (error: unknown) {
      console.error(error)
      setRequest({ status: 'error', message: errorMessage })
      return
    }
    setRequest({ status: 'idle' })
    onChange(progress)
  }

  function start() {
    void run(() => startParticipant(eventId, teamId), START_ERROR)
  }

  function finish() {
    void run(() => finishParticipant(eventId, teamId), FINISH_ERROR)
  }

  return {
    start,
    finish,
    isPending: request.status === 'pending',
    error: request.status === 'error' ? request.message : null,
  }
}
