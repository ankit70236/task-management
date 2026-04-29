import { Bell, FileText, MessageSquare, Search } from 'lucide-react'
import { Navigate, useParams } from 'react-router-dom'
import { appContentFrame } from '@/lib/appLayout'
import { cn } from '@/lib/utils'

const pageBg = '#f8f9fb'

const featureMeta: Record<string, { title: string; subtitle: string }> = {
  calendar: { title: 'Calendar', subtitle: 'View tasks by date' },
  analytics: { title: 'Analytics', subtitle: 'Productivity insights' },
  messages: { title: 'Messages', subtitle: 'Chats & conversations' },
  documents: { title: 'Documents', subtitle: 'Files & links' },
  'location-reminders': { title: 'Location Reminders', subtitle: 'Set location-based alerts' },
  'team-management': { title: 'Team Management', subtitle: 'Manage your teams' },
  'project-settings': { title: 'Project Settings', subtitle: 'Configure projects' },
  'privacy-security': { title: 'Privacy & Security', subtitle: 'Account protection' },
  preferences: { title: 'Preferences', subtitle: 'App customization' },
}

export function MoreFeaturePage() {
  const { featureKey = '' } = useParams()
  const meta = featureMeta[featureKey]

  if (!meta) {
    return <Navigate to="/more" replace />
  }

  return (
    <main className="relative min-h-[calc(100vh-5rem)] w-full min-w-0" style={{ backgroundColor: pageBg }}>
      <header className="border-b border-[#ececf3] bg-white pt-3 pb-2">
        <div className={cn(appContentFrame, 'flex items-center justify-between')}>
          <h1 className="text-lg font-semibold text-[#1c2030]">{meta.title}</h1>
          <div className="flex items-center gap-3 text-[#4f556b]">
            <Search className="size-4" aria-hidden />
            <MessageSquare className="size-4" aria-hidden />
            <Bell className="size-4" aria-hidden />
            <span className="flex size-8 items-center justify-center rounded-full bg-[#e9e7ff] text-sm font-semibold text-[#5f64ea]">
              A
            </span>
          </div>
        </div>
      </header>

      <div className={cn(appContentFrame, 'mx-auto space-y-3 py-3')}>
        <article className="rounded-2xl border border-[#ececf3] bg-white p-8 text-center shadow-sm sm:p-10">
          <FileText className="mx-auto size-14 text-[#9ca3af]" strokeWidth={1.25} />
          <p className="mt-4 text-lg font-semibold text-[#111827]">{meta.title}</p>
          <p className="mt-2 text-sm text-[#6b7280]">{meta.subtitle}</p>
        </article>
      </div>
    </main>
  )
}
