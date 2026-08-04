import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// ✅ Vite configuration optimized for Vercel + Google crawling
export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  base: '/', // ensures correct routing and asset loading

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
