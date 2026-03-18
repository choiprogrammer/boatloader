import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/boatloader/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
})
