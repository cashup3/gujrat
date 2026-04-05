import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ensures deep links like /en, /ur, /admin work on static hosts (e.g. Vercel).
  appType: 'spa',
})
