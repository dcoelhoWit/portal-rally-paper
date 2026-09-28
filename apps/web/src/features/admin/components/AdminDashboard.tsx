import { AppHeader } from '../../../components'
import { SignOutButton } from '../../auth'

type AdminDashboardProps = {
  email: string
}

// Placeholder until the admin features exist.
export function AdminDashboard({ email }: AdminDashboardProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader
        title="Portal Rally Paper"
        badge={
          <span className="rounded border border-primary-container/30 bg-primary-container/20 px-2 py-0.5 font-label text-xs tracking-widest text-primary-container uppercase">
            Admin
          </span>
        }
        actions={<SignOutButton />}
      />
      <main className="mx-auto w-full max-w-6xl flex-1 p-4 sm:p-6 lg:p-8">
        <section className="rounded-2xl border border-surface-variant/40 bg-surface-container-low p-6 shadow-2xl sm:p-8">
          <h1 className="font-headline text-xl font-semibold tracking-tight text-on-surface sm:text-2xl">
            Painel de administração
          </h1>
          <p className="mt-1.5 font-body text-sm text-on-surface-variant">
            Sessão iniciada como <strong className="text-on-surface">{email}</strong>
          </p>
        </section>
      </main>
    </div>
  )
}
