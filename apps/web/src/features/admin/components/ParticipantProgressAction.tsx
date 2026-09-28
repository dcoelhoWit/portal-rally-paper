import { useState } from 'react'
import { Button, ConfirmDialog, Icon } from '../../../components'
import { useParticipantProgress, type EventParticipant, type ParticipantProgress } from '../../events'

type ParticipantProgressActionProps = {
  eventId: string
  participant: EventParticipant
  onChange: (teamId: string, progress: ParticipantProgress) => void
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

  const [isConfirmingFinish, setIsConfirmingFinish] = useState(false)

  if (status === 'finished') return null

  function confirmFinish() {
    setIsConfirmingFinish(false)
    finish()
  }

  return (
    <div className="flex flex-col items-end gap-1">
      {status === 'waiting' ? (
        <Button
          variant="success"
          size="sm"
          loading={isPending}
          onClick={start}
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
          onClick={() => setIsConfirmingFinish(true)}
          leadingIcon={<Icon name="stop" className="text-lg" />}
          aria-label={`Terminar prova de ${teamName}`}
        >
          Terminar
        </Button>
      )}
      <ConfirmDialog
        open={isConfirmingFinish}
        title="Terminar prova?"
        confirmLabel="Terminar"
        confirmVariant="danger"
        onConfirm={confirmFinish}
        onCancel={() => setIsConfirmingFinish(false)}
      >
        A prova da equipa <strong className="text-on-surface">{teamName}</strong> será dada como
        terminada com a hora atual. Esta ação não pode ser desfeita.
      </ConfirmDialog>
      {error && (
        <p role="alert" className="font-body text-xs text-error">
          {error}
        </p>
      )}
    </div>
  )
}
