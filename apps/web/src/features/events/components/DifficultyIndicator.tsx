import { Icon } from '../../../components'
import { cn } from '../../../lib/cn'

const MAX_DIFFICULTY = 5
const LEVELS = Array.from({ length: MAX_DIFFICULTY }, (_, index) => index + 1)

type DifficultyIndicatorProps = {
  /** 1 (easiest) to 5 (hardest); out-of-range values are clamped. */
  level: number
}

function clampLevel(level: number): number {
  return Math.min(MAX_DIFFICULTY, Math.max(1, Math.round(level)))
}

export function DifficultyIndicator({ level }: DifficultyIndicatorProps) {
  const clampedLevel = clampLevel(level)

  return (
    <div className="flex items-center gap-2">
      <span className="font-label text-xs tracking-wider text-on-surface-variant uppercase">
        Dificuldade
      </span>
      <div
        role="img"
        aria-label={`Dificuldade ${clampedLevel} de ${MAX_DIFFICULTY}`}
        className="flex items-center"
      >
        {LEVELS.map((step) => (
          <Icon
            key={step}
            name="local_fire_department"
            className={cn(
              'text-base',
              step <= clampedLevel
                ? 'text-primary-container [font-variation-settings:"FILL"_1]'
                : 'text-on-surface-variant/30',
            )}
          />
        ))}
      </div>
    </div>
  )
}
