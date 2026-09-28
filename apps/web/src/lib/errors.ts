const FALLBACK_MESSAGE = 'Something went wrong. Please try again.'

/** Extracts a user-facing message from an unknown thrown value. */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message
  return FALLBACK_MESSAGE
}
