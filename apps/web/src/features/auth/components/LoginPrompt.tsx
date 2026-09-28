import { Link } from 'react-router'
import { paths } from '../../../lib/paths'

export function LoginPrompt() {
  return (
    <div className="mt-8 border-t border-surface-variant/30 pt-4 text-center">
      <p className="font-body text-xs text-on-surface-variant sm:text-sm">
        Já tem conta?{' '}
        <Link
          to={paths.login}
          className="ml-1 font-semibold text-primary underline transition-colors hover:text-primary-fixed"
        >
          Entrar
        </Link>
      </p>
    </div>
  )
}
