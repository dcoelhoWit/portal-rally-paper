import { SignOutButton } from './SignOutButton'

type SessionActionsProps = {
  /** The signed-in user's email, shown from the `sm` breakpoint up. */
  email: string
}

/** The header's right side on signed-in screens: who is signed in, and sign-out. */
export function SessionActions({ email }: SessionActionsProps) {
  return (
    <div className="flex min-w-0 items-center gap-4">
      <p className="hidden min-w-0 truncate font-body text-sm text-on-surface-variant sm:block">
        <strong className="text-on-surface">{email}</strong>
      </p>
      <SignOutButton />
    </div>
  )
}
