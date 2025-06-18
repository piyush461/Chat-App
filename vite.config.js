import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base:"/Chat-App/",
  plugins: [react(),
    tailwindcss(),
  ],
  server: {
    host: true, 
    port: 5173
  }
})
