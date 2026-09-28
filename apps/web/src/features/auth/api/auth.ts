import { supabase } from '../../../lib/supabase'
import type { Session, SignUpValues } from '../types'

/** Signs in with email + password. Throws the Supabase `AuthError` on failure. */
export async function signInWithPassword(email: string, password: string): Promise<Session> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data.session
}

/** Whether no team uses this name yet (case-insensitive). Throws the Supabase error on failure. */
export async function isTeamNameAvailable(teamName: string): Promise<boolean> {
  const { data, error } = await supabase.rpc('is_team_name_available', { team_name: teamName })
  if (error) throw error
  return data
}

/**
 * Creates the account; a database trigger creates the team from `team_name`.
 * Returns the session, or `null` when the project requires e-mail confirmation first.
 * Throws the Supabase `AuthError` on failure.
 */
export async function signUp({ teamName, email, password }: SignUpValues): Promise<Session | null> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { team_name: teamName.trim() } },
  })
  if (error) throw error
  return data.session
}

/** Signs out the current user. Throws the Supabase `AuthError` on failure. */
export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

/**
 * Subscribes to session changes. Supabase emits the current session immediately
 * (`INITIAL_SESSION`), so this also serves as the initial session read.
 * Returns an unsubscribe function.
 */
export function onAuthStateChange(callback: (session: Session | null) => void): () => void {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session))
  return () => data.subscription.unsubscribe()
}
