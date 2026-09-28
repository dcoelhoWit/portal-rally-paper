import { Button, Icon } from '../../../components'
import { useSignOut } from '../hooks/useSignOut'

export function SignOutButton() {
  const { signOut, isLoading, error } = useSignOut()

  return (
    <div className="flex flex-col items-end gap-1.5">
      <Button
        variant="secondary"
        loading={isLoading}
        leadingIcon={<Icon name="logout" className="text-base" />}
        onClick={() => void signOut()}
      >
        Terminar sessão
      </Button>
      {error && (
        <p role="alert" className="font-body text-xs text-error">
          {error}
        </p>
      )}
    </div>
  )
}
