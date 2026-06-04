import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), babel({ presets: [reactCompilerPreset()] })],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/exchange-rates': {
        target: 'https://api.frankfurter.dev',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/exchange-rates/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'tw-animate-css': path.resolve(__dirname, 'node_modules/tw-animate-css/dist/tw-animate.css'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/shared/test/setup.ts'],
    css: true,
    clearMocks: true,
    restoreMocks: true,
  },
})
