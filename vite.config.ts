import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    watch: {
      usePolling: true,
    },
    strictPort: true, // opcional: evita puertos aleatorios
    port: 5173,        // puedes cambiarlo si el 5173 está ocupado
  },
  build: {
    sourcemap: false,
  }
})
