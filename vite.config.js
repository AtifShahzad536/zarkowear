import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [react()],
  base: '/', // ensures correct routing and asset loading

  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: true,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-framer': ['framer-motion'],
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
        }
      }
    }
  },

  server: {
    port: 5173,
    open: true,
  },

  preview: {
    port: 4173,
    strictPort: true,
  },

  // ✅ Helps search engines access assets properly
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
