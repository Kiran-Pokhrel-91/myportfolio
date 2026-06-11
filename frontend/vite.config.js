import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const dir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      '#components': resolve(dir, 'src/components'),
      '#constants': resolve(dir, 'src/constants'),
      '#store': resolve(dir, 'src/store'),
      '#hoc': resolve(dir, 'src/hoc'),
      '#windows': resolve(dir, 'src/windows'),
    },
  },
})