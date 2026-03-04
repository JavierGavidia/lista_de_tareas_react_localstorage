import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/lista_de_tareas_react_localstorage/", // Nombre del proyecto en github
})
