import { useEffect, useId, useRef, type ReactNode } from 'react'
import { Button } from './Button'
import type { ButtonVariant } from './buttonStyles'

type ConfirmDialogProps = {
  open: boolean
  title: string
  children: ReactNode
  confirmLabel: string
  cancelLabel?: string
  /** Style of the confirm button, e.g. `danger` for irreversible actions. */
  confirmVariant?: ButtonVariant
  onConfirm: () => void
  /** Called on the cancel button, Escape, or a click on the backdrop. */
  onCancel: () => void
}

/**
 * Modal confirmation built on the native `<dialog>`: it traps focus, closes on Escape
 * and renders a backdrop. Focus starts on the cancel button so Enter never confirms by accident.
 */
export function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel,
  cancelLabel = 'Cancelar',
  confirmVariant = 'primary',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      cancelRef.current?.focus()
    }
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      // Escape fires `cancel`; keep React state as the source of truth.
      onCancel={(event) => {
        event.preventDefault()
        onCancel()
      }}
      // A click on the dialog element itself (not its content) is a click on the backdrop.
      onClick={(event) => {
        if (event.target === event.currentTarget) onCancel()
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md text-left whitespace-normal rounded-2xl border border-surface-variant/40 bg-surface-container-low p-0 text-on-surface shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="space-y-4 p-6">
        <h2 id={titleId} className="font-headline text-lg font-semibold tracking-tight">
          {title}
        </h2>
        <div id={descriptionId} className="font-body text-sm text-on-surface-variant">
          {children}
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button ref={cancelRef} variant="secondary" size="sm" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant={confirmVariant} size="sm" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  )
}
