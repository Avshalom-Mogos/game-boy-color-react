import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/game-boy-color-react/' : '/',
  server: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 5173,
  },
})
