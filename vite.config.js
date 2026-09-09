import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/app_cafe/',
  server: {
    host: true,
    port: 5174
  }
})
