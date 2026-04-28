import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { HomePage } from '@/features/home/pages/HomePage'
import { CreateWorkspacePage } from '@/features/onboarding/pages/CreateWorkspacePage'
import { SignupPage } from './features/auth/pages/SignupPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" replace />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/signup" element={<SignupPage />} />
      <Route path="/onboarding/workspace" element={<CreateWorkspacePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/dashboard" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}

export default App
