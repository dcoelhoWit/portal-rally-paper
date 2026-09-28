import { cn } from '../../../lib/cn'
import { formatDateTime, type EventParticipant } from '../../events'

type ParticipantsTableProps = {
  participants: EventParticipant[]
}

const headerCellClassName = 'px-4 py-3 font-medium'

/** The registered teams, in registration order. Scrolls horizontally on narrow screens. */
export function ParticipantsTable({ participants }: ParticipantsTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-surface-variant/40 bg-surface-container-low shadow-lg">
      <table className="w-full min-w-md text-left font-body text-sm">
        <thead className="border-b border-surface-variant/30 font-label text-xs tracking-wider text-on-surface-variant uppercase">
          <tr>
            <th scope="col" className={cn('w-12', headerCellClassName)}>
              #
            </th>
            <th scope="col" className={headerCellClassName}>
              Equipa
            </th>
            <th scope="col" className={headerCellClassName}>
              Inscrita em
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-variant/30">
          {participants.map(({ teamId, teamName, registeredAt }, index) => (
            <tr key={teamId}>
              <td className="px-4 py-3 font-label text-xs text-on-surface-variant">{index + 1}</td>
              <td className="px-4 py-3 font-medium text-on-surface">{teamName}</td>
              <td className="px-4 py-3 whitespace-nowrap text-on-surface-variant">
                <time dateTime={registeredAt}>{formatDateTime(registeredAt)}</time>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
