import { useMemo, useState } from 'react'
import { Bell, FileText, MessageSquare, Plus, Search } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { addNote } from '@/features/notes/notesSlice'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { appContentFrame, appFloatingRight } from '@/lib/appLayout'
import { cn } from '@/lib/utils'

const accent = '#6366f1'
const pageBg = '#f8f9fb'

function formatRelative(iso: string) {
  const d = new Date(iso)
  return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export function NotesPage() {
  const dispatch = useAppDispatch()
  const notes = useAppSelector((s) => s.notes)

  const [search, setSearch] = useState('')
  const [createOpen, setCreateOpen] = useState(false)
  const [draftTitle, setDraftTitle] = useState('')
  const [draftBody, setDraftBody] = useState('')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    let list = [...notes].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    if (q) {
      list = list.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.body.toLowerCase().includes(q)
      )
    }
    return list
  }, [notes, search])

  const emptyCopy = (() => {
    if (!notes.length) {
      return {
        title: 'No notes yet',
        subtitle: 'Tap + to create your first note',
      }
    }
    if (search.trim()) {
      return { title: 'No matches', subtitle: 'Try a different search.' }
    }
    return {
      title: 'No notes yet',
      subtitle: 'Tap + to create your first note',
    }
  })()

  function handleSave() {
    dispatch(addNote({ title: draftTitle, body: draftBody }))
    setDraftTitle('')
    setDraftBody('')
    setCreateOpen(false)
  }

  return (
    <main className="relative min-h-[calc(100vh-5rem)]" style={{ backgroundColor: pageBg }}>
      <header className="border-b border-[#ececf3] bg-white pt-3 pb-2">
        <div className={cn(appContentFrame, 'flex items-center justify-between')}>
          <h1 className="text-lg font-semibold text-[#1c2030]">Notes</h1>
          <div className="flex items-center gap-3 text-[#4f556b]">
            <Search className="size-4" aria-hidden />
            <MessageSquare className="size-4" aria-hidden />
            <Bell className="size-4" aria-hidden />
            <span
              className="flex size-8 items-center justify-center rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: `${accent}33`, color: accent }}
            >
              A
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
            placeholder="Search notes..."
            className="h-11 rounded-full border-[#ececf3] bg-white pl-11 pr-4 text-[#1c2030] shadow-sm placeholder:text-[#8a8ea2]"
          />
        </div>

        <section className="min-h-[40vh]">
          {filtered.length === 0 ? (
            <article className="rounded-2xl border border-[#ececf3] bg-white p-8 text-center shadow-sm sm:p-10">
              <FileText className="mx-auto size-14 text-[#9ca3af]" strokeWidth={1.25} />
              <p className="mt-4 text-lg font-semibold text-[#111827]">{emptyCopy.title}</p>
              <p className="mt-2 text-sm text-[#6b7280]">{emptyCopy.subtitle}</p>
            </article>
          ) : (
            <ul className="space-y-2">
              {filtered.map((n) => (
                <li
                  key={n.id}
                  className="rounded-2xl border border-[#ececf3] bg-white px-4 py-3 text-left shadow-sm"
                >
                  <p className="font-medium text-[#1c2030]">{n.title}</p>
                  {n.body ? (
                    <p className="mt-1 line-clamp-2 text-sm text-[#6b7280]">{n.body}</p>
                  ) : null}
                  <p className="mt-2 text-xs text-[#9ca3af]">{formatRelative(n.updatedAt)}</p>
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
        aria-label="New note"
      >
        <Plus className="size-7" strokeWidth={2.5} />
      </button>

      {createOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="new-note-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-[#ececf3] bg-white p-5 shadow-xl">
            <h2 id="new-note-title" className="text-lg font-semibold text-[#1c2030]">
              New note
            </h2>
            <div className="mt-4 space-y-2">
              <Label htmlFor="note-title">Title</Label>
              <Input
                id="note-title"
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                placeholder="Note title"
                className="h-10 border-[#ececf3]"
                autoFocus
              />
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="note-body">Content</Label>
              <textarea
                id="note-body"
                value={draftBody}
                onChange={(e) => setDraftBody(e.target.value)}
                placeholder="Write something…"
                rows={5}
                className="w-full min-w-0 resize-y rounded-lg border border-[#ececf3] bg-transparent px-2.5 py-2 text-sm text-[#1c2030] outline-none placeholder:text-[#8a8ea2] focus-visible:border-[#6366f1] focus-visible:ring-2 focus-visible:ring-[#6366f1]/30"
              />
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setCreateOpen(false)}>
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSave}
                disabled={!draftTitle.trim() && !draftBody.trim()}
                className="text-white"
                style={{ backgroundColor: accent }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}
