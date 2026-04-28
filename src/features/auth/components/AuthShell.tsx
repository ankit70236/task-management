import { CheckSquare2 } from 'lucide-react'
import type { ReactNode } from 'react'

type AuthShellProps = {
  title: string
  subtitle: string
  children: ReactNode
  footer: ReactNode
}

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-auth-bg px-4 py-10">
      <section className="w-full max-w-sm space-y-6">
        <header className="space-y-3 text-center">
          <div className="mx-auto flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <CheckSquare2 className="size-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </header>
        {children}
        <div className="text-center text-sm text-muted-foreground">{footer}</div>
      </section>
    </main>
  )
}
