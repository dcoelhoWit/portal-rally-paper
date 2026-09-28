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
function toParticipantStatus(value: string): ParticipantStatus {
  const status = PARTICIPANT_STATUSES.find((known) => known === value)
  if (!status) throw new Error(`Unknown participant status: ${value}`)
  return status
}

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

function toProgress({ status, start_time, end_time }: ProgressRow): ParticipantProgress {
  return { status: toParticipantStatus(status), startTime: start_time, endTime: end_time }
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
