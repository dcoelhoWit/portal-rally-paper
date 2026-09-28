import { Button } from './Button'
import { Icon } from './Icon'

type ErrorPanelProps = {
  /** Short summary of what failed, e.g. "Não foi possível carregar os eventos". */
  title: string
  message: string
  /** When given, shows a "Tentar novamente" button that calls it. */
  onRetry?: () => void
}

/** An alert panel for a failed load, optionally with a retry action. */
export function ErrorPanel({ title, message, onRetry }: ErrorPanelProps) {
  return (
    <div
      role="alert"
      className="flex flex-col gap-2 rounded-xl border border-error/40 bg-error-container/40 p-4 text-error shadow-lg"
    >
      <div className="flex items-center gap-2">
        <Icon name="warning" className="shrink-0 text-lg" />
        <span className="font-label text-xs font-bold tracking-wider uppercase">{title}</span>
      </div>
      <p className="font-body text-xs leading-relaxed text-on-surface">{message}</p>
      {onRetry && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onRetry}
          leadingIcon={<Icon name="refresh" className="text-base" />}
          className="mt-1 self-start"
        >
          Tentar novamente
        </Button>
      )}
    </div>
  )
}
