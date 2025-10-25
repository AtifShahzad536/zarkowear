import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // HTML plugin for better HTML handling
    createHtmlPlugin({
      minify: true,
    })
  ],
  // Build optimization
  build: {
    minify: 'terser',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
  // Server configuration
  server: {
    port: 3000,
    open: true,
  },
  // Alias for cleaner imports
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
