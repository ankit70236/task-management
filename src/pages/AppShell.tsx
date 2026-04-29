import { FileText, Folder, LayoutGrid, ListChecks, MoreHorizontal, Sparkles } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { toast } from 'sonner'
import { appFooterGutter } from '@/lib/appLayout'
import { cn } from '@/lib/utils'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-lg px-0.5 py-1 text-[11px] transition-colors',
    isActive ? 'text-[#5f64ea]' : 'text-[#8a8ea2]'
  )

export function AppShell() {
  return (
    <div className="min-h-screen bg-[#f3f4f8] pb-20">
      <Outlet />
      <nav className="fixed right-0 bottom-0 left-0 z-40 border-t border-[#ececf3] bg-white">
        <div className={cn(appFooterGutter, 'flex justify-center py-2')}>
          <div className="flex w-full max-w-sm min-w-0 items-center justify-between sm:max-w-md md:max-w-lg lg:max-w-xl">
            <NavLink to="/home" className={navLinkClass} end>
              <LayoutGrid className="mx-auto size-4" />
              Home
            </NavLink>
            <NavLink to="/tasks" className={navLinkClass}>
              <ListChecks className="mx-auto size-4" />
              Tasks
            </NavLink>
            <NavLink to="/projects" className={navLinkClass}>
              <Folder className="mx-auto size-4" />
              Projects
            </NavLink>
            <NavLink to="/notes" className={navLinkClass}>
              <FileText className="mx-auto size-4" />
              Notes
            </NavLink>
            <button
              type="button"
              onClick={() => toast.message('Coming soon')}
              className="flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-0.5 rounded-lg px-0.5 py-1 text-[11px] text-[#8a8ea2] transition-colors hover:text-[#6b6f8a] active:opacity-80"
              aria-label="AI — coming soon"
            >
              <Sparkles className="mx-auto size-4" />
              AI
            </button>
            <span className="flex min-w-0 flex-1 flex-col items-center gap-0.5 text-[11px] text-[#8a8ea2] opacity-50" title="Coming soon">
              <MoreHorizontal className="mx-auto size-4" />
              More
            </span>
          </div>
        </div>
      </nav>
    </div>
  )
}
