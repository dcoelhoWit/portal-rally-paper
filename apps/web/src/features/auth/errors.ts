/** Reads the machine-readable `code` Supabase attaches to its errors (e.g. `AuthError.code`). */
export function getErrorCode(error: unknown): string | undefined {
  if (!(error instanceof Error) || !('code' in error)) return undefined
  return typeof error.code === 'string' ? error.code : undefined
}
