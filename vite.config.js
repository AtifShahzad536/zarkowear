import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
   export default defineConfig({
     plugins: [react()],
     base: '/',
     build: {
       outDir: 'dist',
       minify: 'terser',
       sourcemap: false,
       cssCodeSplit: true,
       rollupOptions: {
         output: {
           manualChunks: {
             react: ['react', 'react-dom', 'react-router-dom'],
             vendor: ['framer-motion', 'react-icons']
           }
         }
       }
     },
     server: {
       port: 5173,
       open: true
     }
   });
