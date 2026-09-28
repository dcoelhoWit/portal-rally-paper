import { useState } from 'react'
import { Button, ConfirmDialog, Icon } from '../../../components'
import { useParticipantProgress, type EventParticipant, type ParticipantProgress } from '../../events'

type ParticipantProgressActionProps = {
  eventId: string
  participant: EventParticipant
  onChange: (teamId: string, progress: ParticipantProgress) => void
}

type ProgressAction = 'start' | 'finish'

const confirmations: Record<
  ProgressAction,
  { title: string; confirmLabel: string; confirmVariant: 'success' | 'danger'; outcome: string }
> = {
  start: {
    title: 'Começar prova?',
    confirmLabel: 'Começar',
    confirmVariant: 'success',
    outcome: 'iniciada',
  },
  finish: {
    title: 'Terminar prova?',
    confirmLabel: 'Terminar',
    confirmVariant: 'danger',
    outcome: 'terminada',
  },
}

/** "Começar" for a waiting team, "Terminar" for one in the race, nothing once finished. */
export function ParticipantProgressAction({
  eventId,
  participant,
  onChange,
}: ParticipantProgressActionProps) {
  const { teamId, teamName, status } = participant
  const { start, finish, isPending, error } = useParticipantProgress({
    eventId,
    teamId,
    onChange: (progress) => onChange(teamId, progress),
  })

  // The action awaiting confirmation in the dialog, if any.
  const [confirming, setConfirming] = useState<ProgressAction | null>(null)

  if (status === 'finished') return null

  function confirm() {
    const action = confirming
    setConfirming(null)
    if (action === 'start') start()
    if (action === 'finish') finish()
  }

  const confirmation = confirming ? confirmations[confirming] : null

  return (
    <div className="flex flex-col items-end gap-1">
      {status === 'waiting' ? (
        <Button
          variant="success"
          size="sm"
          loading={isPending}
          onClick={() => setConfirming('start')}
          leadingIcon={<Icon name="play_arrow" className="text-lg" />}
          aria-label={`Começar prova de ${teamName}`}
        >
          Começar
        </Button>
      ) : (
        <Button
          variant="danger"
          size="sm"
          loading={isPending}
          onClick={() => setConfirming('finish')}
          leadingIcon={<Icon name="stop" className="text-lg" />}
          aria-label={`Terminar prova de ${teamName}`}
        >
          Terminar
        </Button>
      )}
      <ConfirmDialog
        open={confirmation !== null}
        title={confirmation?.title ?? ''}
        confirmLabel={confirmation?.confirmLabel ?? ''}
        confirmVariant={confirmation?.confirmVariant}
        onConfirm={confirm}
        onCancel={() => setConfirming(null)}
      >
        A prova da equipa <strong className="text-on-surface">{teamName}</strong> será dada como{' '}
        {confirmation?.outcome} com a hora atual. Esta ação não pode ser desfeita.
      </ConfirmDialog>
      {error && (
        <p role="alert" className="font-body text-xs text-error">
          {error}
        </p>
      )}
    </div>
  )
}
