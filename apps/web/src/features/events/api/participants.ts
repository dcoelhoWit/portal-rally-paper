import { supabase } from '../../../lib/supabase'
import {
  PARTICIPANT_STATUSES,
  type EventParticipant,
  type ParticipantProgress,
  type ParticipantStatus,
} from '../types'

// Postgres unique_violation: the (event_id, team_id) primary key already exists.
const UNIQUE_VIOLATION = '23505'

/** Registers `teamId` in `eventId`. Throws the Supabase error on failure (e.g. a past event). */
export async function registerForEvent(eventId: string, teamId: string): Promise<void> {
  const { error } = await supabase
    .from('participants')
    .insert({ event_id: eventId, team_id: teamId })
  // Already registered (e.g. from another tab) is the state the user asked for.
  if (error && error.code !== UNIQUE_VIOLATION) throw error
}

/** Removes `teamId`'s registration in `eventId`. Throws if nothing was removed. */
export async function cancelRegistration(eventId: string, teamId: string): Promise<void> {
  // RLS doesn't error on a blocked delete, it just matches no rows; returning the
  // deleted rows is how we tell "cancelled" apart from "not allowed / not found".
  const { data, error } = await supabase
    .from('participants')
    .delete()
    .eq('event_id', eventId)
    .eq('team_id', teamId)
    .select('event_id')
  if (error) throw error
  if (data.length === 0) {
    throw new Error('No registration was cancelled: it does not exist or the event is over.')
  }
}

/**
 * The teams registered in `eventId`, earliest registration first. Only an admin can read
 * every team's rows (RLS). Throws the Supabase error on failure.
 */
export async function listEventParticipants(eventId: string): Promise<EventParticipant[]> {
  const { data, error } = await supabase
    .from('participants')
    .select('created_at, status, start_time, end_time, team:teams(id, name)')
    .eq('event_id', eventId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data.map(({ created_at, team, ...progress }) => ({
    ...toProgress(progress),
    teamId: team.id,
    teamName: team.name,
    registeredAt: created_at,
  }))
}

type ProgressRow = { status: string; start_time: string | null; end_time: string | null }

/** Maps a participant row's progress columns. Throws on a status the app doesn't know. */
export function toProgress({ status, start_time, end_time }: ProgressRow): ParticipantProgress {
  return { status: toParticipantStatus(status), startTime: start_time, endTime: end_time }
}

function toParticipantStatus(value: string): ParticipantStatus {
  const status = parseParticipantStatus(value)
  if (!status) throw new Error(`Unknown participant status: ${value}`)
  return status
}

function parseParticipantStatus(value: unknown): ParticipantStatus | null {
  return PARTICIPANT_STATUSES.find((known) => known === value) ?? null
}

/**
 * Admin only: waiting -> in_progress, stamping start_time with the server clock.
 * Throws if the caller isn't an admin or the team isn't waiting.
 */
export async function startParticipant(eventId: string, teamId: string): Promise<ParticipantProgress> {
  const { data, error } = await supabase.rpc('start_participant', {
    p_event_id: eventId,
    p_team_id: teamId,
  })
  if (error) throw error
  return toProgress(data)
}

/**
 * Admin only: in_progress -> finished, stamping end_time with the server clock.
 * Throws if the caller isn't an admin or the team isn't in progress.
 */
export async function finishParticipant(eventId: string, teamId: string): Promise<ParticipantProgress> {
  const { data, error } = await supabase.rpc('finish_participant', {
    p_event_id: eventId,
    p_team_id: teamId,
  })
  if (error) throw error
  return toProgress(data)
}

type ParticipationListeners = {
  /** Called with the team's new progress whenever the admin changes it. */
  onChange: (progress: ParticipantProgress) => void
  /**
   * Called each time the channel is (re)subscribed. Changes made while it wasn't are never
   * delivered, so this is the moment to refetch.
   */
  onSubscribed: () => void
}

/**
 * Listens live to `teamId`'s participation in `eventId`. Realtime applies RLS, so a team
 * only ever receives its own rows. Returns a function that stops listening.
 */
export function subscribeToParticipation(
  eventId: string,
  teamId: string,
  { onChange, onSubscribed }: ParticipationListeners,
): () => void {
  const channel = supabase
    .channel(`participation:${eventId}:${teamId}`)
    .on<Record<string, unknown>>(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'participants',
        // Realtime filters take a single column; the event is checked in the handler.
        filter: `team_id=eq.${teamId}`,
      },
      (payload) => {
        if (payload.new.event_id !== eventId) return
        const progress = parseProgressPayload(payload.new)
        if (!progress) {
          console.warn('Ignoring a malformed participant change', payload.new)
          return
        }
        onChange(progress)
      },
    )
    .subscribe((status, error) => {
      if (status === 'SUBSCRIBED') onSubscribed()
      if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
        // The client retries on its own; `onSubscribed` fires again once it's back.
        console.error(`Participation channel ${status}`, error)
      }
    })

  return () => {
    void supabase.removeChannel(channel)
  }
}

/** The progress in a Realtime row, or `null` if any field has an unexpected shape. */
function parseProgressPayload(row: Record<string, unknown>): ParticipantProgress | null {
  const status = parseParticipantStatus(row.status)
  const { start_time: startTime, end_time: endTime } = row
  if (!status || !isNullableString(startTime) || !isNullableString(endTime)) return null
  return { status, startTime, endTime }
}

function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === 'string'
}
