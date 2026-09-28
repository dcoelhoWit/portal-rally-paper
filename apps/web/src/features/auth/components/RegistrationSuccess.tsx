import { Link } from 'react-router'
import { Icon } from '../../../components'
import { paths } from '../../../lib/paths'

type RegistrationSuccessProps = {
  email: string
}

/** Shown instead of the form when the account needs e-mail confirmation before signing in. */
export function RegistrationSuccess({ email }: RegistrationSuccessProps) {
  return (
    <div
      role="status"
      className="flex flex-col gap-3 rounded-xl border border-secondary/40 bg-surface-container-lowest p-5 shadow-lg"
    >
      <div className="flex items-center gap-2 text-secondary">
        <Icon name="mark_email_read" className="shrink-0 text-lg" />
        <span className="font-label text-xs font-bold tracking-wider uppercase">Conta criada!</span>
      </div>
      <p className="font-body text-sm leading-relaxed text-on-surface">
        Enviámos um e-mail para <strong>{email}</strong> — confirme o endereço para poder entrar.
      </p>
      <Link
        to={paths.login}
        className="flex items-center gap-1 self-start font-semibold text-primary underline transition-colors hover:text-primary-fixed"
      >
        Entrar
        <Icon name="arrow_forward" className="text-base" />
      </Link>
    </div>
  )
}
