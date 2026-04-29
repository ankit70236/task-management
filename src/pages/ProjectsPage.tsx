import { useMemo, useState } from 'react'
import { Bell, FolderKanban, MessageSquare, Plus, Search } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { addProject, type ProjectStatus } from '@/features/projects/projectsSlice'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { appContentFrame, appFloatingRight } from '@/lib/appLayout'
import { cn } from '@/lib/utils'

const accent = '#6366f1'

const statusChips: { id: 'all' | ProjectStatus; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'on_hold', label: 'On Hold' },
  { id: 'completed', label: 'Completed' },
]

const statusLabels: Record<ProjectStatus, string> = {
  active: 'Active',
  on_hold: 'On Hold',
  completed: 'Completed',
}

export function ProjectsPage() {
  const dispatch = useAppDispatch()
  const projects = useAppSelector((s) => s.projects)
  const tasks = useAppSelector((s) => s.tasks)

  const [statusFilter, setStatusFilter] = useState<'all' | ProjectStatus>('all')
  const [search, setSearch] = useState('')
  const [createOpen, setCreateOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [newStatus, setNewStatus] = useState<ProjectStatus>('active')

  const filtered = useMemo(() => {
    let list = [...projects]
    if (statusFilter !== 'all') {
      list = list.filter((p) => p.status === statusFilter)
    }
    const q = search.trim().toLowerCase()
    if (q) list = list.filter((p) => p.name.toLowerCase().includes(q))
    return list
  }, [projects, statusFilter, search])

  const isGloballyEmpty = projects.length === 0

  const emptyCopy = (() => {
    if (isGloballyEmpty && statusFilter === 'all' && !search.trim()) {
      return {
        title: 'No projects yet',
        subtitle: 'Create your first project to get started',
      }
    }
    if (statusFilter === 'active') {
      return { title: 'No active projects', subtitle: 'Try another filter or create a project with the + button.' }
    }
    if (statusFilter === 'on_hold') {
      return { title: 'Nothing on hold', subtitle: 'Projects you pause will show up here.' }
    }
    if (statusFilter === 'completed') {
      return { title: 'No completed projects', subtitle: 'Finished projects appear here.' }
    }
    if (search.trim()) {
      return { title: 'No matches', subtitle: 'Try a different search term.' }
    }
    return { title: 'No projects yet', subtitle: 'Create your first project to get started' }
  })()

  function taskCountForProject(projectId: string) {
    return tasks.filter((t) => t.projectId === projectId).length
  }

  function handleAddProject() {
    const name = newName.trim()
    if (!name) return
    dispatch(addProject({ name, status: newStatus }))
    setNewName('')
    setCreateOpen(false)
  }

  return (
    <main className="relative min-h-[calc(100vh-5rem)] bg-[#f9fafb]">
      <header className="border-b border-[#ececf3] bg-white pt-3 pb-2">
        <div className={cn(appContentFrame, 'flex items-center justify-between')}>
          <h1 className="text-lg font-semibold text-[#1c2030]">Projects</h1>
          <div className="flex items-center gap-3 text-[#4f556b]">
            <Search className="size-4" aria-hidden />
            <MessageSquare className="size-4" aria-hidden />
            <Bell className="size-4" aria-hidden />
            <span
              className="relative flex size-8 items-center justify-center rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: accent }}
            >
              A
              <span className="absolute top-0 right-0 size-2 rounded-full border-2 border-white bg-emerald-500" />
            </span>
          </div>
        </div>
      </header>

      <div className={cn(appContentFrame, 'mx-auto space-y-3 py-3')}>
        <div className="relative min-w-0">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#8a8ea2]" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="h-11 rounded-full border-[#ececf3] bg-white pl-11 pr-4 text-[#1c2030] shadow-sm placeholder:text-[#8a8ea2]"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {statusChips.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setStatusFilter(c.id)}
              className={cn(
                'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                statusFilter === c.id ? 'text-white' : 'bg-[#f3f4f6] text-[#374151] hover:bg-[#e5e7eb]'
              )}
              style={statusFilter === c.id ? { backgroundColor: accent } : undefined}
            >
              {c.label}
            </button>
          ))}
        </div>

        <section className="min-h-[40vh]">
          {filtered.length === 0 ? (
            <article className="rounded-2xl border border-[#ececf3] bg-white p-8 text-center shadow-sm sm:p-10">
              <FolderKanban className="mx-auto size-14 text-[#9ca3af]" strokeWidth={1.25} />
              <p className="mt-4 text-lg font-semibold text-[#111827]">{emptyCopy.title}</p>
              <p className="mt-2 text-sm text-[#6b7280]">{emptyCopy.subtitle}</p>
            </article>
          ) : (
            <ul className="space-y-2">
              {filtered.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center gap-3 rounded-2xl border border-[#ececf3] bg-white px-4 py-3 text-left shadow-sm"
                >
                  <span className="min-w-0 flex-1 font-medium text-[#1c2030]">{p.name}</span>
                  <span
                    className="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium"
                    style={{ backgroundColor: `${accent}18`, color: accent }}
                  >
                    {statusLabels[p.status]}
                  </span>
                  <span className="shrink-0 text-xs text-[#8a8ea2]">{taskCountForProject(p.id)} tasks</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <button
        type="button"
        onClick={() => setCreateOpen(true)}
        className={cn(
          'fixed bottom-20 z-30 flex size-14 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105 active:scale-95',
          appFloatingRight
        )}
        style={{ backgroundColor: accent, boxShadow: `0 10px 25px -5px ${accent}55` }}
        aria-label="Add project"
      >
        <Plus className="size-7" strokeWidth={2.5} />
      </button>

      {createOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-project-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-[#ececf3] bg-white p-5 shadow-xl">
            <h2 id="create-project-title" className="text-lg font-semibold text-[#1c2030]">
              New project
            </h2>
            <div className="mt-4 space-y-2">
              <Label htmlFor="project-name">Name</Label>
              <Input
                id="project-name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Project name"
                className="h-10 border-[#ececf3]"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddProject()
                }}
              />
            </div>
            <div className="mt-4 space-y-2">
              <Label>Status</Label>
              <div className="flex flex-wrap gap-2">
                {(['active', 'on_hold', 'completed'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setNewStatus(s)}
                    className={cn(
                      'rounded-full px-3 py-1 text-sm font-medium',
                      newStatus === s ? 'text-white' : 'bg-[#f3f4f6] text-[#4f556b]'
                    )}
                    style={newStatus === s ? { backgroundColor: accent } : undefined}
                  >
                    {statusLabels[s]}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setCreateOpen(false)}>
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleAddProject}
                disabled={!newName.trim()}
                className="text-white"
                style={{ backgroundColor: accent }}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}
