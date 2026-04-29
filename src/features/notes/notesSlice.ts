import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit'

export interface Note {
  id: string
  title: string
  body: string
  updatedAt: string
}

export interface AddNotePayload {
  title: string
  body?: string
}

function nowIso() {
  return new Date().toISOString()
}

const initialState: Note[] = []

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<AddNotePayload>) => {
      const title = action.payload.title.trim()
      const body = (action.payload.body ?? '').trim()
      if (!title && !body) return
      state.push({
        id: nanoid(),
        title: title || '(Untitled)',
        body,
        updatedAt: nowIso(),
      })
    },
    updateNote: (state, action: PayloadAction<{ id: string; title: string; body: string }>) => {
      const n = state.find((x) => x.id === action.payload.id)
      if (!n) return
      n.title = action.payload.title.trim() || '(Untitled)'
      n.body = action.payload.body.trim()
      n.updatedAt = nowIso()
    },
    removeNote: (state, action: PayloadAction<string>) => {
      const i = state.findIndex((n) => n.id === action.payload)
      if (i !== -1) state.splice(i, 1)
    },
  },
})

export const { addNote, updateNote, removeNote } = notesSlice.actions
export default notesSlice.reducer
