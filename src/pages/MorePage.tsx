import type { LucideIcon } from 'lucide-react'
import {
  BarChart3,
  Building2,
  Calendar,
  ChevronRight,
  Files,
  FileText,
  FolderCog,
  LayoutGrid,
  LogOut,
  MapPin,
  MessageSquare,
  Search,
  Settings,
  Shield,
  Users,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAppSelector } from '@/app/hooks'
import { appContentFrame } from '@/lib/appLayout'
import { cn } from '@/lib/utils'

function formatCreated(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  })
}

function MenuCard({
  icon: Icon,
  title,
  subtitle,
  onClick,
  to,
}: {
  icon: LucideIcon
  title: string
  subtitle: string
  onClick?: () => void
  to?: string
}) {
  const className =
    'flex min-w-0 items-center gap-3 rounded-2xl border border-[#ececf3] bg-white p-3 text-left shadow-sm transition-colors hover:bg-[#fafbfc]'
  const body = (
    <>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#f3f4f8] text-[#4f556b]">
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-[#1c2030]">{title}</p>
        <p className="mt-0.5 text-sm text-[#8a8ea2]">{subtitle}</p>
      </div>
      <ChevronRight className="size-4 shrink-0 text-[#c4c9d6]" aria-hidden />
    </>
  )

  if (to) {
    return (
      <Link to={to} className={className}>
        {body}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {body}
    </button>
  )
}

const pageBg = '#f8f9fb'

export function MorePage() {
  const navigate = useNavigate()
  const { name, memberCount, createdAt } = useAppSelector((s) => s.workspace)

  function comingSoon() {
    toast.message('Coming soon')
  }

  return (
    <main
      className="relative min-h-[calc(100vh-5rem)] w-full min-w-0 pb-6"
      style={{ backgroundColor: pageBg }}
    >
      <header className="w-full border-b border-[#ececf3] bg-white pt-3 pb-2">
        <div className={cn(appContentFrame, 'flex items-center justify-between')}>
          <h1 className="text-lg font-semibold tracking-tight text-[#111827]">More</h1>
          <div className="flex items-center gap-2 text-[#4f556b] sm:gap-3">
            <button type="button" className="rounded-lg p-0.5 hover:bg-[#f3f4f8]" aria-label="Search" onClick={comingSoon}>
              <Search className="size-4" />
            </button>
            <button type="button" className="rounded-lg p-0.5 hover:bg-[#f3f4f8]" aria-label="Messages" onClick={comingSoon}>
              <MessageSquare className="size-4" />
            </button>
            <button type="button" className="rounded-lg p-0.5 hover:bg-[#f3f4f8]" aria-label="App menu" onClick={comingSoon}>
              <LayoutGrid className="size-4" />
            </button>
            <span className="flex size-8 items-center justify-center rounded-full bg-[#e9e7ff] text-sm font-semibold text-[#5f64ea]">
              A
            </span>
          </div>
        </div>
      </header>

      <div className={cn(appContentFrame, 'mx-auto mt-3 space-y-4')}>
        <section className="overflow-hidden rounded-2xl bg-[#eef0ff] p-4">
          <div className="flex gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
              <Building2 className="size-6" strokeWidth={1.5} />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold tracking-wider text-[#6b7280]">ACTIVE WORKSPACE</p>
              <p className="mt-1 text-lg font-bold text-[#111827]">{name}</p>
              <p className="mt-1 text-sm text-[#6b7280]">
                {memberCount} member{memberCount === 1 ? '' : 's'} · Created {formatCreated(createdAt)}
              </p>
            </div>
          </div>
          <Link
            to="/onboarding/workspace"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#dfe3ff] py-2.5 text-sm font-semibold text-[#5f64ea] transition-colors hover:bg-[#d2d8ff]"
          >
            <Settings className="size-4" />
            Manage Workspace
          </Link>
        </section>

        <div className="space-y-2">
          <MenuCard icon={Calendar} title="Calendar" subtitle="View tasks by date" to="/more/calendar" />
          <MenuCard icon={BarChart3} title="Analytics" subtitle="Productivity insights" to="/more/analytics" />
          <MenuCard icon={MessageSquare} title="Messages" subtitle="Chats & conversations" to="/more/messages" />
          <MenuCard icon={Files} title="Documents" subtitle="Files & links" to="/more/documents" />
          <MenuCard icon={FileText} title="Notes" subtitle="Quick notes & ideas" to="/notes" />
          <MenuCard icon={MapPin} title="Location Reminders" subtitle="Set location-based alerts" to="/more/location-reminders" />
          <MenuCard icon={Users} title="Team Management" subtitle="Manage your teams" to="/more/team-management" />
          <MenuCard icon={FolderCog} title="Project Settings" subtitle="Configure projects" to="/more/project-settings" />
          <MenuCard icon={Shield} title="Privacy & Security" subtitle="Account protection" to="/more/privacy-security" />
          <MenuCard icon={Settings} title="Preferences" subtitle="App customization" to="/more/preferences" />
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#dc2626] py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#b91c1c]"
          onClick={() => navigate('/auth/login')}
        >
          <LogOut className="size-4" />
          Log Out
        </button>
      </div>
    </main>
  )
}
