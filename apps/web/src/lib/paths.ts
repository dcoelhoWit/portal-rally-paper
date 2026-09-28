/** App URLs, shared so features can link to each other without importing from `src/app`. */
export const paths = {
  home: '/',
  admin: '/admin',
  login: '/entrar',
  register: '/registar',
  rallyPaper: '/eventos/:eventId',
  adminEventParticipants: '/admin/eventos/:eventId',
} as const

/** URL of an event's rally paper page. */
export function rallyPaperPath(eventId: string): string {
  return paths.rallyPaper.replace(':eventId', encodeURIComponent(eventId))
}

/** URL of the admin page listing an event's registered teams. */
export function adminEventParticipantsPath(eventId: string): string {
  return paths.adminEventParticipants.replace(':eventId', encodeURIComponent(eventId))
}
