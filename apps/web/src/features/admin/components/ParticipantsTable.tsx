import { cn } from '../../../lib/cn'
import {
  formatDateTime,
  formatTimeOfDay,
  ParticipantStatusTag,
  type EventParticipant,
  type ParticipantProgress,
} from '../../events'
import { ParticipantProgressAction } from './ParticipantProgressAction'

type ParticipantsTableProps = {
  eventId: string
  participants: EventParticipant[]
  onProgressChange: (teamId: string, progress: ParticipantProgress) => void
}

const headerCellClassName = 'px-4 py-3 font-medium'
const timeCellClassName = 'px-4 py-3 font-label text-xs whitespace-nowrap text-on-surface'

function TimeCell({ time }: { time: string | null }) {
  return (
    <td className={timeCellClassName}>
      {time ? (
        <time dateTime={time}>{formatTimeOfDay(time)}</time>
      ) : (
        <>
          <span aria-hidden="true">—</span>
          <span className="sr-only">Sem registo</span>
        </>
      )}
    </td>
  )
}

/** The registered teams, in registration order. Scrolls horizontally on narrow screens. */
export function ParticipantsTable({ eventId, participants, onProgressChange }: ParticipantsTableProps) {
  return (
    <div className="relative overflow-x-auto rounded-2xl border border-surface-variant/40 bg-surface-container-low shadow-lg">
      <table className="w-full min-w-3xl text-left font-body text-sm">
        <thead className="border-b border-surface-variant/30 font-label text-xs tracking-wider text-on-surface-variant uppercase">
          <tr>
            <th scope="col" className={cn('w-12', headerCellClassName)}>
              #
            </th>
            <th scope="col" className={headerCellClassName}>
              Equipa
            </th>
            <th scope="col" className={headerCellClassName}>
              Estado
            </th>
            <th scope="col" className={headerCellClassName}>
              Início
            </th>
            <th scope="col" className={headerCellClassName}>
              Fim
            </th>
            <th scope="col" className={headerCellClassName}>
              Inscrita em
            </th>
            <th scope="col" className={cn('text-right', headerCellClassName)}>
              <span className="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-variant/30">
          {participants.map((participant, index) => {
            const { teamId, teamName, status, startTime, endTime, registeredAt } = participant
            return (
              <tr key={teamId}>
                <td className="px-4 py-3 font-label text-xs text-on-surface-variant">{index + 1}</td>
                <td className="px-4 py-3 font-medium text-on-surface">{teamName}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <ParticipantStatusTag status={status} />
                </td>
                <TimeCell time={startTime} />
                <TimeCell time={endTime} />
                <td className="px-4 py-3 whitespace-nowrap text-on-surface-variant">
                  <time dateTime={registeredAt}>{formatDateTime(registeredAt)}</time>
                </td>
                <td className="px-4 py-3 text-right">
                  <ParticipantProgressAction
                    eventId={eventId}
                    participant={participant}
                    onChange={onProgressChange}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
