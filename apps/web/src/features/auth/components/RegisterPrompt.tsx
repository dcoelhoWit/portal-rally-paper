import { Link } from 'react-router'
import { paths } from '../../../lib/paths'

export function RegisterPrompt() {
  return (
    <div className="mt-8 border-t border-surface-variant/30 pt-4 text-center">
      <p className="font-body text-xs text-on-surface-variant sm:text-sm">
        Ainda não tem conta?{' '}
        <Link
          to={paths.register}
          className="ml-1 font-semibold text-primary underline transition-colors hover:text-primary-fixed"
        >
          Registe-se no portal
        </Link>
      </p>
    </div>
  )
}
