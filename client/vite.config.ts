import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { // Proxy just for local development. In the production this will be on the same server
      '/api': {
        target: `http://localhost:3000`, // local Nest app
        changeOrigin: true
      }
    }
  }
})
