import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit'

export type TaskCategory = 'personal' | 'work' | 'shopping' | 'health' | 'travel'

export type TaskScope = 'self' | 'project' | 'team'

export interface Task {
  id: string
  title: string
  category: TaskCategory
  scope: TaskScope
  completed: boolean
}

export interface AddTaskPayload {
  title: string
  category: TaskCategory
  scope?: TaskScope
}

const initialState: Task[] = []

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<AddTaskPayload>) => {
      const { title, category, scope = 'self' } = action.payload
      const trimmed = title.trim()
      if (!trimmed) return
      state.push({
        id: nanoid(),
        title: trimmed,
        category,
        scope,
        completed: false,
      })
    },
    toggleTaskComplete: (state, action: PayloadAction<string>) => {
      const task = state.find((t) => t.id === action.payload)
      if (task) task.completed = !task.completed
    },
    removeTask: (state, action: PayloadAction<string>) => {
      const i = state.findIndex((t) => t.id === action.payload)
      if (i !== -1) state.splice(i, 1)
    },
  },
})

export const { addTask, toggleTaskComplete, removeTask } = tasksSlice.actions
export default tasksSlice.reducer
