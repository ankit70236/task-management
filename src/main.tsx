import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import 'sonner/dist/styles.css'
import './index.css'
import App from './App.tsx'
import { store } from '@/app/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster position="top-center" duration={2600} richColors closeButton />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
