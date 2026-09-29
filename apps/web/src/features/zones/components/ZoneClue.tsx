import { Icon } from '../../../components'
import type { Zone } from '../types'

type ZoneClueProps = {
  zone: Zone
}

/** The zone's clue: an image, an audio player, or a note that it couldn't be loaded. */
export function ZoneClue({ zone }: ZoneClueProps) {
  const { clueKind, clueUrl, name } = zone

  if (!clueUrl || !clueKind) {
    return (
      <p className="flex items-center gap-2 font-body text-sm text-error">
        <Icon name="error" className="shrink-0 text-lg" />
        <span>Não foi possível carregar a pista.</span>
      </p>
    )
  }

  if (clueKind === 'image') {
    return (
      <img
        src={clueUrl}
        alt={`Pista da zona ${name}`}
        loading="lazy"
        className="h-auto w-full rounded-lg"
      />
    )
  }

  return (
    <audio
      controls
      preload="metadata"
      src={clueUrl}
      aria-label={`Pista da zona ${name}`}
      className="w-full"
    >
      O seu navegador não consegue reproduzir esta pista áudio.
    </audio>
  )
}
