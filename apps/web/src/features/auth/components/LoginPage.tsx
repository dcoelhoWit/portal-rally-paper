import { AuthLayout } from './AuthLayout'
import { RegisterPrompt } from './RegisterPrompt'
import { SignInForm } from './SignInForm'

export function LoginPage() {
  return (
    <AuthLayout title="Autenticação" description="Por favor, introduzir e-mail e password">
      <SignInForm />
      <RegisterPrompt />
    </AuthLayout>
  )
}
