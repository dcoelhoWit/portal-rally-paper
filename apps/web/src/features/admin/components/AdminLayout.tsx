import type { ReactNode } from 'react'
import { AppHeader } from '../../../components'
import { SessionActions } from '../../auth'

type AdminLayoutProps = {
  /** The signed-in admin's email, shown in the header. */
  email: string
  children: ReactNode
}

/** Page shell for admin screens: header with the "Admin" badge, then the page content. */
export function AdminLayout({ email, children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader
        title="Portal Rally Paper"
        badge={
          <span className="rounded border border-primary-container/30 bg-primary-container/20 px-2 py-0.5 font-label text-xs tracking-widest text-primary-container uppercase">
            Admin
          </span>
        }
        actions={<SessionActions email={email} />}
      />
      <main className="mx-auto w-full max-w-6xl flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  )
}
