import type { WorkspaceFormValues } from '@/features/onboarding/schemas/workspaceSchema'

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export async function createWorkspace(payload: WorkspaceFormValues) {
  await delay(900)
  if (payload.workspaceName.toLowerCase() === 'taken') {
    throw new Error('Workspace name already exists')
  }
  return { ok: true }
}
