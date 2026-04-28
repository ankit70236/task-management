import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { loginUser } from '@/features/auth/api/authApi'
import { AuthShell } from '@/features/auth/components/AuthShell'
import { loginSchema, type LoginFormValues } from '@/features/auth/schemas/authSchemas'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState('')
  const emailFromQuery = searchParams.get('email') ?? ''
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: emailFromQuery,
      password: '',
      rememberMe: false,
    },
  })

  const emailValue = watch('email')

  const onSubmit = async (values: LoginFormValues) => {
    setServerError('')
    try {
      await loginUser(values)
      navigate('/dashboard')
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Unable to sign in')
    }
  }

  return (
    <AuthShell
      title="TaskFlow"
      subtitle="Your productivity command center"
      footer={
        <p>
          Don&apos;t have an account?{' '}
          <Link className="font-semibold text-primary hover:underline" to={`/auth/signup?email=${encodeURIComponent(emailValue)}`}>
            Sign up
          </Link>
        </p>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-2">
          <Label htmlFor="login-email">Email</Label>
          <Input id="login-email" placeholder="you@example.com" {...register('email')} aria-invalid={Boolean(errors.email)} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="login-password">Password</Label>
          <div className="relative">
            <Input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="********"
              {...register('password')}
              aria-invalid={Boolean(errors.password)}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between">
          <Controller
            control={control}
            name="rememberMe"
            render={({ field }) => (
              <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                <Checkbox checked={field.value} onCheckedChange={(value) => field.onChange(Boolean(value))} />
                Remember me
              </label>
            )}
          />
          <button type="button" className="text-sm text-primary hover:underline">
            Forgot password?
          </button>
        </div>

        {serverError && <p className="text-sm text-destructive">{serverError}</p>}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </AuthShell>
  )
}
