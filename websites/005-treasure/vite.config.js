import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  base: './', // 👈 Add this line right here
  plugins: [react(), tailwindcss(), imagetools()],
})

