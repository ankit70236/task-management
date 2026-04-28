import type { LoginFormValues, SignupFormValues } from '@/features/auth/schemas/authSchemas'

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export async function loginUser(payload: LoginFormValues) {
  await delay(800)
  if (payload.email === 'blocked@example.com') {
    throw new Error('Invalid email or password')
  }
  return { ok: true }
}

export async function signupUser(payload: SignupFormValues) {
  await delay(900)
  if (payload.email === 'taken@example.com') {
    throw new Error('Email is already registered')
  }
  return { ok: true }
}
