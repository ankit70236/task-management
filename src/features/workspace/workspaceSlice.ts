import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface WorkspaceState {
  name: string
  memberCount: number
  createdAt: string
}

const initialState: WorkspaceState = {
  name: 'aks',
  memberCount: 1,
  createdAt: new Date('2026-04-28T12:00:00.000Z').toISOString(),
}

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setWorkspace: (_state, action: PayloadAction<WorkspaceState>) => action.payload,
  },
})

export const { setWorkspace } = workspaceSlice.actions
export default workspaceSlice.reducer
