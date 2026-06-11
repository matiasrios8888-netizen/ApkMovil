import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base relativa para que los assets carguen dentro del WebView de Capacitor
export default defineConfig({
  plugins: [react()],
  base: './',
})
