import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    host:'localhost',
    port:8080,
    proxy: {
      '/api': {
        rewrite: path => path.replace(/^\/api/, ''),
        target: "http://localhost:8081/myIndex",
        changeOrigin: true,
      },
    },
  },
  plugins: [vue()],
})
