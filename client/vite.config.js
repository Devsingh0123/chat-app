import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
   resolve: {
    alias: {
      //  Map the '@' symbol straight to your 'src' directory
      '@': path.resolve(__dirname, './src'),
    },
  },
})
