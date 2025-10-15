import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // For user/org GitHub Pages (username.github.io)
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure public assets are copied
    copyPublicDir: true,
  },
})
