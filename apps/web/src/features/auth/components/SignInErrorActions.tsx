import { Icon } from '../../../components'

/** Recovery links shown in the sign-in error alert. */
export function SignInErrorActions() {
  return (
    <>
      {/* TODO: point these at the password-reset and support flows once they exist. */}
      <a
        href="#"
        className="flex items-center gap-1 text-error underline transition-colors hover:text-white"
      >
        <Icon name="lock_reset" className="text-xs" />
        Reset Pit Passkey
      </a>
      <span aria-hidden="true" className="text-on-surface-variant/40">
        •
      </span>
      <a
        href="#"
        className="flex items-center gap-1 text-on-surface-variant transition-colors hover:text-white"
      >
        <Icon name="support_agent" className="text-xs" />
        Contact Race Engineer
      </a>
    </>
  )
}
