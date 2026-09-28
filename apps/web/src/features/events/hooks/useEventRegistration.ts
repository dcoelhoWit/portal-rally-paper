import { useState } from 'react'
import { cancelRegistration, registerForEvent } from '../api/participants'

type UseEventRegistrationOptions = {
  eventId: string
  teamId: string
  /** Called with the new registration status once the server has accepted the change. */
  onChange: (isRegistered: boolean) => void
}

type RegistrationRequest =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'error'; message: string }

// Supabase/Postgres messages are English and technical; show a fixed Portuguese one instead.
const REGISTER_ERROR = 'Não foi possível concluir a inscrição.'
const CANCEL_ERROR = 'Não foi possível cancelar a inscrição.'

/** Registers / cancels a team in one event. Not optimistic: `onChange` runs only after success. */
export function useEventRegistration({ eventId, teamId, onChange }: UseEventRegistrationOptions) {
  const [request, setRequest] = useState<RegistrationRequest>({ status: 'idle' })

  async function run(action: () => Promise<void>, isRegistered: boolean, errorMessage: string) {
    setRequest({ status: 'pending' })
    try {
      await action()
    } catch (error: unknown) {
      console.error(error)
      setRequest({ status: 'error', message: errorMessage })
      return
    }
    setRequest({ status: 'idle' })
    onChange(isRegistered)
  }

  function register() {
    void run(() => registerForEvent(eventId, teamId), true, REGISTER_ERROR)
  }

  function cancel() {
    void run(() => cancelRegistration(eventId, teamId), false, CANCEL_ERROR)
  }

  return {
    register,
    cancel,
    isPending: request.status === 'pending',
    error: request.status === 'error' ? request.message : null,
  }
}
