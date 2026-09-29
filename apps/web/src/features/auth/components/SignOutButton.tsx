import { Button, Icon } from '../../../components'
import { useSignOut } from '../hooks/useSignOut'

export function SignOutButton() {
  const { signOut, isLoading, error } = useSignOut()

  return (
    <div className="flex flex-col items-end gap-1.5">
      <Button
        variant="secondary"
        // Icon-only on phones so the header fits next to the title.
        aria-label="Terminar sessão"
        className="max-sm:gap-0 max-sm:px-2.5"
        loading={isLoading}
        leadingIcon={<Icon name="logout" className="text-base" />}
        onClick={() => void signOut()}
      >
        <span className="hidden sm:inline">Terminar sessão</span>
      </Button>
      {error && (
        <p role="alert" className="font-body text-xs text-error">
          {error}
        </p>
      )}
    </div>
  )
}
