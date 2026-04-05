import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { AdminPortal } from './AdminPortal.tsx'
import { defaultLocaleFromStorage, pathForLocale } from './localePath'

function RootRedirect() {
  return (
    <Navigate to={pathForLocale(defaultLocaleFromStorage())} replace />
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/" element={<RootRedirect />} />
        <Route path="/:locale" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
