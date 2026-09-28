import { AuthLayout } from './AuthLayout'
import { LoginPrompt } from './LoginPrompt'
import { RegisterForm } from './RegisterForm'

export function RegisterAccount() {
  return (
    <AuthLayout title="Criar conta" description="Registe a sua equipa para participar no rally.">
      <RegisterForm />
      <LoginPrompt />
    </AuthLayout>
  )
}
