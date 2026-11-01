import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// El sitio compilado se escribe en la carpeta raíz del repositorio (outDir: '..'),
// así GitHub Pages (rama main, carpeta / root) lo publica sin cambiar nada.
export default defineConfig({
  plugins: [react()],
  base: './',
  publicDir: false,
  build: { outDir: '..', emptyOutDir: false },
})
