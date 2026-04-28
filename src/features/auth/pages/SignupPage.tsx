import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { signupUser } from '@/features/auth/api/authApi'
import { AuthShell } from '@/features/auth/components/AuthShell'
import { signupSchema, type SignupFormValues } from '@/features/auth/schemas/authSchemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function getPasswordStrength(password: string) {
  if (password.length >= 12) return 'Strong'
  if (password.length >= 8) return 'Medium'
  return 'Weak'
}

export function SignupPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState('')
  const emailFromQuery = searchParams.get('email') ?? ''
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: emailFromQuery,
      password: '',
    },
  })

  const emailValue = watch('email')
  const passwordValue = watch('password')
  const passwordStrength = useMemo(() => getPasswordStrength(passwordValue), [passwordValue])

  const onSubmit = async (values: SignupFormValues) => {
    setServerError('')
    try {
      await signupUser(values)
      navigate(`/auth/login?email=${encodeURIComponent(values.email)}`)
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Unable to create account')
    }
  }

  return (
    <AuthShell
      title="TaskFlow"
      subtitle="Create your account"
      footer={
        <p>
          Already have an account?{' '}
          <Link className="font-semibold text-primary hover:underline" to={`/auth/login?email=${encodeURIComponent(emailValue)}`}>
            Sign in
          </Link>
        </p>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-2">
          <Label htmlFor="signup-full-name">Full Name</Label>
          <Input id="signup-full-name" placeholder="John Doe" {...register('fullName')} aria-invalid={Boolean(errors.fullName)} />
          {errors.fullName && <p className="text-xs text-destructive">{errors.fullName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <Input id="signup-email" placeholder="you@example.com" {...register('email')} aria-invalid={Boolean(errors.email)} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-password">Password</Label>
          <div className="relative">
            <Input
              id="signup-password"
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
          <p className="text-xs text-muted-foreground">Strength: {passwordStrength}</p>
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>

        {serverError && <p className="text-sm text-destructive">{serverError}</p>}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>
    </AuthShell>
  )
}
