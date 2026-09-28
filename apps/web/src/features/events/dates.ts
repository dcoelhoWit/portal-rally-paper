/** The viewer's local calendar date as 'YYYY-MM-DD', the same shape as a Postgres `date`. */
export function localToday(now: Date = new Date()): string {
  const year = String(now.getFullYear())
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Whether an event ('YYYY-MM-DD') is already over for the viewer. 'YYYY-MM-DD' strings
 * sort chronologically, so a string comparison is enough. This is only UX: the database
 * decides (in UTC) whether a registration can still change.
 */
export function isPastEvent(date: string, today: string = localToday()): boolean {
  return date < today
}

/** Whether an event ('YYYY-MM-DD') happens on the viewer's local today. UX only, like `isPastEvent`. */
export function isEventToday(date: string, today: string = localToday()): boolean {
  return date === today
}
