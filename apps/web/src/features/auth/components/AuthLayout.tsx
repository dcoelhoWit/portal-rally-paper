import type { ReactNode } from 'react'
import { AuthHero } from './AuthHero'
import { BrandHeader } from './BrandHeader'

type AuthLayoutProps = {
  title: string
  description: string
  children: ReactNode
}

/** Shared screen for the signed-out pages: hero image on the left, branded content on the right. */
export function AuthLayout({ title, description, children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
      <main className="mx-auto grid min-h-[640px] w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl border border-surface-variant/40 bg-surface-container-low shadow-2xl lg:grid-cols-12">
        <AuthHero />
        <div className="flex flex-col justify-center bg-surface-container-low px-6 py-10 sm:px-12 lg:col-span-7 xl:px-16">
          <BrandHeader title={title} description={description} />
          {children}
        </div>
      </main>
    </div>
  )
}
