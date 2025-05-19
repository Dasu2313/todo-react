import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig({
  base: 'https://dasu23.github.io/todo-react/',
  plugins: [react()],
})
