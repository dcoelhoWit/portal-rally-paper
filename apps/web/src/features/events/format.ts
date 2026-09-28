// UTC on both sides so a 'YYYY-MM-DD' date never shifts a day in the viewer's timezone.
const eventDateFormatter = new Intl.DateTimeFormat('pt-PT', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

/** Formats a Postgres `date` ('YYYY-MM-DD') as a long pt-PT date, e.g. "12 de outubro de 2026". */
export function formatEventDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number)
  if (year === undefined || month === undefined || day === undefined) return date
  const timestamp = Date.UTC(year, month - 1, day)
  if (Number.isNaN(timestamp)) return date
  return eventDateFormatter.format(timestamp)
}

// No `timeZone`: a registration timestamp is shown in the viewer's own timezone.
const dateTimeFormatter = new Intl.DateTimeFormat('pt-PT', {
  dateStyle: 'short',
  timeStyle: 'short',
})

/** Formats a Postgres `time` ('HH:MM:SS') as 'HH:MM'. */
export function formatTimeOfDay(time: string): string {
  return time.slice(0, 5)
}

/** Formats an ISO timestamp as a short pt-PT date and time, e.g. "28/09/2026, 17:05". */
export function formatDateTime(timestamp: string): string {
  const date = new Date(timestamp)
  if (Number.isNaN(date.getTime())) return timestamp
  return dateTimeFormatter.format(date)
}
