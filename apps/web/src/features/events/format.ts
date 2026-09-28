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
