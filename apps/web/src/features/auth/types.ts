import type { TypedSupabaseClient } from '@portal/supabase'

type GetSessionResult = Awaited<ReturnType<TypedSupabaseClient['auth']['getSession']>>

/** Supabase auth session, derived from the typed client so we don't depend on supabase-js directly. */
export type Session = NonNullable<GetSessionResult['data']['session']>

/** What the registration form collects. */
export type RegistrationValues = {
  teamName: string
  email: string
  password: string
  passwordConfirmation: string
}

/** What sign-up sends to Supabase (the confirmation is a client-side check only). */
export type SignUpValues = Omit<RegistrationValues, 'passwordConfirmation'>

/** Admins run the rally; every other account belongs to a team. */
export type UserRole = 'admin' | 'team'
