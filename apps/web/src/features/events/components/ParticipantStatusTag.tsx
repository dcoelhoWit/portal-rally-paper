import { Tag } from '../../../components'
import type { ParticipantStatus } from '../types'

const statusTags: Record<
  ParticipantStatus,
  { label: string; tone: 'success' | 'accent' | 'muted'; icon: string }
> = {
  waiting: { label: 'Em espera', tone: 'muted', icon: 'hourglass_empty' },
  in_progress: { label: 'Em prova', tone: 'accent', icon: 'directions_car' },
  finished: { label: 'Terminado', tone: 'success', icon: 'sports_score' },
}

export function ParticipantStatusTag({ status }: { status: ParticipantStatus }) {
  const { label, tone, icon } = statusTags[status]
  return (
    <Tag tone={tone} icon={icon}>
      {label}
    </Tag>
  )
}
