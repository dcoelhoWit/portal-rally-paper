import { ZoneList } from '../../zones'

type RallyPaperSheetProps = {
  eventId: string
}

/** Where the team answers the rally paper. */
export function RallyPaperSheet({ eventId }: RallyPaperSheetProps) {
  // TODO: when answers are saved, RLS on that table must also require the team to be
  // registered in the event and the event date to be `current_date`: the client-side
  // availability checks are UX only.
  return (
    <section
      aria-labelledby="rally-paper-heading"
      className="min-w-0 space-y-4 rounded-2xl border border-surface-variant/40 bg-surface-container-low p-4 shadow-lg sm:p-6"
    >
      <h2
        id="rally-paper-heading"
        className="font-headline text-lg font-semibold tracking-tight text-on-surface"
      >
        Rally Paper
      </h2>
      <ZoneList eventId={eventId} />
    </section>
  )
}
