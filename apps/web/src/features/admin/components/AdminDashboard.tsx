import { AdminEventGrid } from './AdminEventGrid'
import { AdminLayout } from './AdminLayout'

type AdminDashboardProps = {
  email: string
}

export function AdminDashboard({ email }: AdminDashboardProps) {
  return (
    <AdminLayout email={email}>
      <section aria-labelledby="events-heading" className="space-y-4">
        <h2
          id="events-heading"
          className="font-headline text-lg font-semibold tracking-tight text-on-surface"
        >
          Eventos
        </h2>
        <AdminEventGrid />
      </section>
    </AdminLayout>
  )
}
