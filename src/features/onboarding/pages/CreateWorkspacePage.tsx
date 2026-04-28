import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, BriefcaseBusiness } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { createWorkspace } from '@/features/onboarding/api/workspaceApi'
import { workspaceSchema, type WorkspaceFormValues } from '@/features/onboarding/schemas/workspaceSchema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function getDefaultWorkspaceName(fullName: string) {
  const trimmed = fullName.trim()
  if (!trimmed) {
    return ''
  }
  const firstName = trimmed.split(' ')[0]
  return `${firstName}'s Workspace`
}

export function CreateWorkspacePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const fullName = searchParams.get('name') ?? ''
  const email = searchParams.get('email') ?? ''
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<WorkspaceFormValues>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      workspaceName: getDefaultWorkspaceName(fullName),
    },
  })

  const onSubmit = async (values: WorkspaceFormValues) => {
    try {
      await createWorkspace(values)
      navigate('/home')
    } catch (error) {
      setError('workspaceName', {
        message: error instanceof Error ? error.message : 'Unable to create workspace',
      })
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-auth-bg px-4 py-10">
      <section className="w-full max-w-sm space-y-6">
        <header className="space-y-3 text-center">
          <div className="mx-auto flex size-11 items-center justify-center rounded-2xl bg-primary/15 text-primary shadow-sm">
            <BriefcaseBusiness className="size-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create Your Workspace</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Workspaces keep your teams, projects & tasks organized. Create one to get started.
            </p>
            {email && <p className="mt-1 text-xs text-muted-foreground">Signed in as {email}</p>}
          </div>
        </header>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-2">
            <Label htmlFor="workspace-name">Workspace Name</Label>
            <Input
              id="workspace-name"
              placeholder="e.g. My Company, Personal"
              autoFocus
              {...register('workspaceName')}
              aria-invalid={Boolean(errors.workspaceName)}
            />
            {errors.workspaceName && <p className="text-xs text-destructive">{errors.workspaceName.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            <ArrowRight />
            {isSubmitting ? 'Creating...' : 'Get Started'}
          </Button>
        </form>
      </section>
    </main>
  )
}
