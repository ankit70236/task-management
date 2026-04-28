import { z } from 'zod'

export const workspaceSchema = z.object({
  workspaceName: z
    .string()
    .trim()
    .min(2, 'Workspace name must be at least 2 characters')
    .max(40, 'Workspace name must be at most 40 characters'),
})

export type WorkspaceFormValues = z.infer<typeof workspaceSchema>
