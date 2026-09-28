import type { RegistrationValues } from './types'

// Mirrors the `teams_name_length` check in the `create_teams` migration.
export const TEAM_NAME_MIN_LENGTH = 2
export const TEAM_NAME_MAX_LENGTH = 50
export const PASSWORD_MIN_LENGTH = 8

export type RegistrationErrors = Partial<
  Record<'teamName' | 'password' | 'passwordConfirmation', string>
>

/** Checks the rules the browser's `required`/`type` attributes can't express. Empty result means valid. */
export function validateRegistration(values: RegistrationValues): RegistrationErrors {
  const errors: RegistrationErrors = {}

  // Count code points, like Postgres `char_length`, so emoji etc. match the database check.
  const teamNameLength = [...values.teamName.trim()].length
  if (teamNameLength < TEAM_NAME_MIN_LENGTH || teamNameLength > TEAM_NAME_MAX_LENGTH) {
    errors.teamName = `O nome da equipa deve ter entre ${TEAM_NAME_MIN_LENGTH} e ${TEAM_NAME_MAX_LENGTH} caracteres.`
  }
  if (values.password.length < PASSWORD_MIN_LENGTH) {
    errors.password = `A palavra-passe deve ter pelo menos ${PASSWORD_MIN_LENGTH} caracteres.`
  }
  if (values.passwordConfirmation !== values.password) {
    errors.passwordConfirmation = 'As palavras-passe não coincidem.'
  }

  return errors
}
