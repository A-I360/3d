import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    // Keep root deployments working by default; set VITE_BASE_PATH for a subpath deployment.
    base: env.VITE_BASE_PATH || '/',
    plugins: [react()],
    server: { host: '0.0.0.0', allowedHosts: true },
  }
})
