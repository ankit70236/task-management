import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { CreateWorkspacePage } from '@/features/onboarding/pages/CreateWorkspacePage'
import { SignupPage } from './features/auth/pages/SignupPage'
import { AppShell } from '@/pages/AppShell'
import { HomePage } from '@/pages/HomePage'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { TasksPage } from '@/pages/TasksPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" replace />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/signup" element={<SignupPage />} />
      <Route path="/onboarding/workspace" element={<CreateWorkspacePage />} />
      <Route element={<AppShell />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Route>
      <Route path="/dashboard" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}

export default App
