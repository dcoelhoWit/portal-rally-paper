import type { ReactNode } from 'react'
import { Icon } from '../../../components'

type AuthErrorAlertProps = {
  title: string
  message: string
  /** Optional recovery links shown under the message. */
  actions?: ReactNode
}

export function AuthErrorAlert({ title, message, actions }: AuthErrorAlertProps) {
  return (
    <div
      role="alert"
      className="mb-5 flex flex-col gap-2 rounded-xl border border-error/40 bg-error-container/40 p-4 text-error shadow-lg"
    >
      <div className="flex items-center gap-2">
        <Icon name="warning" className="shrink-0 text-lg" />
        <span className="font-label text-xs font-bold tracking-wider uppercase">{title}</span>
      </div>
      <p className="font-body text-xs leading-relaxed text-on-surface">{message}</p>
      {actions && <div className="flex items-center gap-4 pt-1 font-label text-xs">{actions}</div>}
    </div>
  )
}
