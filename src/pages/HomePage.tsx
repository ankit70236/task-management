import {
  Bell,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Folder,
  ListChecks,
  MapPin,
  MessageSquare,
  Search,
  TriangleAlert,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { useAppSelector } from '@/app/hooks'
import { appContentFrame } from '@/lib/appLayout'
import { cn } from '@/lib/utils'

const calendarRows = [
  ['30', '31', '1', '2', '3', '4', '5'],
  ['6', '7', '8', '9', '10', '11', '12'],
  ['13', '14', '15', '16', '17', '18', '19'],
  ['20', '21', '22', '23', '24', '25', '26'],
  ['27', '28', '29', '30', '1', '2', '3'],
]

function MetricCard({
  icon,
  value,
  label,
}: {
  icon: ReactNode
  value: number
  label: string
}) {
  return (
    <article className="rounded-2xl border border-[#ececf3] bg-white p-3 sm:p-4">
      <div className="text-[#7b7f92]">{icon}</div>
      <p className="mt-2 text-4xl leading-none font-semibold text-[#171a27]">{value}</p>
      <p className="mt-1 text-sm text-[#7b7f92]">{label}</p>
    </article>
  )
}

export function HomePage() {
  const pendingCount = useAppSelector((s) => s.tasks.filter((t) => !t.completed).length)
  const projectCount = useAppSelector((s) => s.projects.filter((p) => p.status !== 'completed').length)

  return (
    <main>
      <section className="bg-[#5f64ea] pt-3 pb-10 text-white">
        <div className={cn(appContentFrame, 'flex items-start justify-between')}>
          <div>
            <p className="text-lg font-semibold">Home</p>
            <p className="mt-3 text-sm/5 text-white/70">Welcome back</p>
            <h1 className="text-3xl font-bold">ankit</h1>
          </div>
          <div className="flex items-center gap-3 pt-1 text-white/90">
            <Search className="size-4" />
            <MessageSquare className="size-4" />
            <Bell className="size-4" />
            <CircleUserRound className="size-6" />
          </div>
        </div>
      </section>

      <section className={cn(appContentFrame, 'mx-auto -mt-8 space-y-3')}>
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard icon={<ListChecks className="size-4" />} value={pendingCount} label="Pending" />
          <MetricCard icon={<Folder className="size-4" />} value={projectCount} label="Active Projects" />
          <MetricCard icon={<TriangleAlert className="size-4 text-[#ef6a6a]" />} value={0} label="Urgent" />
          <MetricCard icon={<CheckCircle2 className="size-4 text-[#31af73]" />} value={0} label="Done Today" />
        </div>

        <article className="flex items-center gap-3 rounded-2xl border border-[#ececf3] bg-white p-3 sm:p-4">
          <div className="rounded-xl bg-[#f1f2ff] p-2 text-[#5f64ea]">
            <MapPin className="size-4" />
          </div>
          <div>
            <p className="font-medium text-[#1c2030]">Enable location</p>
            <p className="text-sm text-[#8a8ea2]">Tap to allow location-based task alerts</p>
          </div>
        </article>

        <section>
          <p className="mb-2 font-semibold text-[#1c2030]">Up Next</p>
          <article className="rounded-2xl border border-[#ececf3] bg-white p-6 text-center sm:p-8">
            <CheckCircle2 className="mx-auto size-7 text-[#31af73]" />
            <p className="mt-2 text-lg font-semibold text-[#1c2030]">All clear for today!</p>
            <p className="text-sm text-[#8a8ea2]">No tasks scheduled</p>
          </article>
        </section>

        <section className="rounded-3xl border border-[#ececf3] bg-white p-3 md:p-5">
          <div className="mb-4 flex items-center justify-between">
            <ChevronLeft className="size-4 text-[#4f556b]" />
            <p className="font-semibold text-[#1c2030]">April 2026</p>
            <ChevronRight className="size-4 text-[#4f556b]" />
          </div>

          <div className="grid grid-cols-7 gap-y-3 text-center text-xs text-[#8a8ea2]">
            <span>Mo</span>
            <span>Tu</span>
            <span>We</span>
            <span>Th</span>
            <span>Fr</span>
            <span>Sa</span>
            <span>Su</span>
            {calendarRows.flatMap((week) =>
              week.map((day) => {
                const isSelected = day === '28'
                return (
                  <span
                    key={`${week[0]}-${day}`}
                    className={isSelected ? 'mx-auto w-20 rounded-full bg-[#5f64ea] py-1 font-semibold text-white' : ''}
                  >
                    {day}
                  </span>
                )
              })
            )}
          </div>

          <div className="mt-5 border-t border-[#ececf3] pt-4 text-sm">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-[#1c2030]">
                Tue, Apr 28 <span className="font-normal text-[#8a8ea2]">{pendingCount} tasks</span>
              </p>
              <button type="button" className="font-medium text-[#5f64ea]">
                + Add
              </button>
            </div>
            <p className="mt-4 text-center text-[#8a8ea2]">No tasks on this day</p>
          </div>
        </section>
      </section>
    </main>
  )
}
