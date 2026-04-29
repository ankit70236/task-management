import { useMemo, useState } from 'react'
import { Bell, Clock, MessageSquare, Plus, Search, Settings2 } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { addTask, type TaskCategory, type TaskScope } from '@/features/tasks/tasksSlice'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { appContentFrame, appFloatingRight } from '@/lib/appLayout'
import { cn } from '@/lib/utils'

const scopeTabs: { id: TaskScope | 'projects' | 'teams'; label: string }[] = [
  { id: 'self', label: 'Self' },
  { id: 'projects', label: 'Projects' },
  { id: 'teams', label: 'Teams' },
]

const categoryOptions: { id: 'all' | TaskCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'personal', label: 'Personal' },
  { id: 'work', label: 'Work' },
  { id: 'shopping', label: 'Shopping' },
  { id: 'health', label: 'Health' },
  { id: 'travel', label: 'Travel' },
]

export function TasksPage() {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector((s) => s.tasks)

  const [scopeTab, setScopeTab] = useState<'self' | 'projects' | 'teams'>('self')
  const [categoryFilter, setCategoryFilter] = useState<'all' | TaskCategory>('all')
  const [search, setSearch] = useState('')
  const [createOpen, setCreateOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newCategory, setNewCategory] = useState<TaskCategory>('personal')

  const filtered = useMemo(() => {
    const scopeForTab: Record<typeof scopeTab, TaskScope> = {
      self: 'self',
      projects: 'project',
      teams: 'team',
    }
    let list = tasks.filter((t) => t.scope === scopeForTab[scopeTab])
    if (scopeTab === 'self' && categoryFilter !== 'all') {
      list = list.filter((t) => t.category === categoryFilter)
    }
    const q = search.trim().toLowerCase()
    if (q) list = list.filter((t) => t.title.toLowerCase().includes(q))
    return list
  }, [tasks, scopeTab, categoryFilter, search])

  const emptyMessage = (() => {
    if (scopeTab === 'projects') return 'No project tasks. Tap + to create one!'
    if (scopeTab === 'teams') return 'No team tasks. Tap + to create one!'
    if (categoryFilter !== 'all') {
      return `No tasks in ${categoryOptions.find((c) => c.id === categoryFilter)?.label}. Tap + to create one!`
    }
    return 'No personal tasks. Tap + to create one!'
  })()

  function handleAddTask() {
    const title = newTitle.trim()
    if (!title) return
    const scope: TaskScope = scopeTab === 'self' ? 'self' : scopeTab === 'projects' ? 'project' : 'team'
    dispatch(addTask({ title, category: newCategory, scope }))
    setNewTitle('')
    setCreateOpen(false)
  }

  return (
    <main className="relative min-h-[calc(100vh-5rem)]">
      <header className="border-b border-[#ececf3] bg-white pt-3 pb-2">
        <div className={cn(appContentFrame, 'flex items-center justify-between')}>
          <h1 className="text-lg font-semibold text-[#1c2030]">Tasks</h1>
          <div className="flex items-center gap-3 text-[#4f556b]">
            <Search className="size-4" />
            <MessageSquare className="size-4" />
            <Bell className="size-4" />
            <span className="flex size-8 items-center justify-center rounded-full bg-[#5f64ea] text-sm font-medium text-white">
              A
            </span>
          </div>
        </div>
      </header>

      <div className={cn(appContentFrame, 'mx-auto space-y-2 py-2')}>
        <div className="flex items-center gap-2">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#8a8ea2]" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="h-10 border-[#ececf3] bg-white pl-9 text-[#1c2030] placeholder:text-[#8a8ea2]"
            />
          </div>
          <button
            type="button"
            className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#ececf3] bg-white text-[#4f556b]"
            aria-label="Filter settings"
          >
            <Settings2 className="size-4" />
          </button>
          <button
            type="button"
            className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#ececf3] bg-white text-[#4f556b]"
            aria-label="Recent"
          >
            <Clock className="size-4" />
          </button>
        </div>

        <div className="flex gap-1 rounded-xl bg-[#e8e9ef] p-1">
          {scopeTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setScopeTab(tab.id as typeof scopeTab)}
              className={cn(
                'flex-1 rounded-lg py-2 text-sm font-medium transition-colors',
                scopeTab === tab.id ? 'bg-white text-[#1c2030] shadow-sm' : 'text-[#6b7084]'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {categoryOptions.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategoryFilter(c.id)}
              className={cn(
                'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                categoryFilter === c.id
                  ? 'bg-[#5f64ea] text-white'
                  : 'bg-[#e8e9ef] text-[#4f556b] hover:bg-[#dedfe8]'
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        <section className="min-h-[40vh]">
          {filtered.length === 0 ? (
            <article className="rounded-2xl border border-[#ececf3] bg-white p-6 text-center shadow-sm sm:p-8">
              <p className="text-[#4f556b]">{emptyMessage}</p>
            </article>
          ) : (
            <ul className="space-y-2">
              {filtered.map((t) => (
                <li
                  key={t.id}
                  className="flex items-center gap-3 rounded-2xl border border-[#ececf3] bg-white px-4 py-3 text-left"
                >
                  <span className="min-w-0 flex-1 font-medium text-[#1c2030]">{t.title}</span>
                  <span className="shrink-0 rounded-full bg-[#f1f2ff] px-2 py-0.5 text-xs text-[#5f64ea]">
                    {t.category}
                  </span>
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
          'fixed bottom-20 z-30 flex size-14 items-center justify-center rounded-full bg-[#5f64ea] text-white shadow-lg shadow-[#5f64ea]/30 transition-transform hover:scale-105 active:scale-95',
          appFloatingRight
        )}
        aria-label="Add task"
      >
        <Plus className="size-7" strokeWidth={2.5} />
      </button>

      {createOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-task-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-[#ececf3] bg-white p-5 shadow-xl">
            <h2 id="create-task-title" className="text-lg font-semibold text-[#1c2030]">
              New task
            </h2>
            <div className="mt-4 space-y-2">
              <Label htmlFor="task-title">Title</Label>
              <Input
                id="task-title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="What do you need to do?"
                className="h-10 border-[#ececf3]"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddTask()
                }}
              />
            </div>
            <div className="mt-4 space-y-2">
              <Label>Category</Label>
              <div className="flex flex-wrap gap-2">
                {categoryOptions
                  .filter((c): c is { id: TaskCategory; label: string } => c.id !== 'all')
                  .map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setNewCategory(c.id)}
                      className={cn(
                        'rounded-full px-3 py-1 text-sm font-medium',
                        newCategory === c.id
                          ? 'bg-[#5f64ea] text-white'
                          : 'bg-[#e8e9ef] text-[#4f556b]'
                      )}
                    >
                      {c.label}
                    </button>
                  ))}
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setCreateOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleAddTask} disabled={!newTitle.trim()}>
                Add task
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}
