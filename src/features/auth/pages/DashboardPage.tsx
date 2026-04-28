import { LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function DashboardPage() {
  return (
    <main className="container mx-auto min-h-screen px-4 py-12">
      <section className="mx-auto max-w-2xl rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
        <h1 className="text-2xl font-semibold">Welcome to TaskFlow</h1>
        <p className="mt-2 text-muted-foreground">You are logged in. Start building your task dashboards next.</p>
        <Link to="/auth/login" className={cn(buttonVariants(), 'mt-6')}>
          <LogOut />
          Sign out
        </Link>
      </section>
    </main>
  )
}
