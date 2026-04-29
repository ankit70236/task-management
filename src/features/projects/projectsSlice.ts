import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit'

export type ProjectStatus = 'active' | 'on_hold' | 'completed'

export interface Project {
  id: string
  name: string
  status: ProjectStatus
}

export interface AddProjectPayload {
  name: string
  status?: ProjectStatus
}

const initialState: Project[] = []

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<AddProjectPayload>) => {
      const { name, status = 'active' } = action.payload
      const trimmed = name.trim()
      if (!trimmed) return
      state.push({
        id: nanoid(),
        name: trimmed,
        status,
      })
    },
    removeProject: (state, action: PayloadAction<string>) => {
      const i = state.findIndex((p) => p.id === action.payload)
      if (i !== -1) state.splice(i, 1)
    },
    setProjectStatus: (state, action: PayloadAction<{ id: string; status: ProjectStatus }>) => {
      const p = state.find((x) => x.id === action.payload.id)
      if (p) p.status = action.payload.status
    },
  },
})

export const { addProject, removeProject, setProjectStatus } = projectsSlice.actions
export default projectsSlice.reducer
