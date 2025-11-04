import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { readFileSync } from 'fs';

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [react()],
    base: '/',
    publicDir: 'public',
    
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      minify: isProduction ? 'terser' : false,
      sourcemap: !isProduction,
      cssCodeSplit: true,
      
      // Ensure static files are copied as-is
      assetsInlineLimit: 0, // Don't inline any files
      
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html')
        },
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            three: ['three', '@react-three/fiber', '@react-three/drei']
          },
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            
            // Special handling for critical files
            if (['robots.txt', 'sitemap.xml'].includes(assetInfo.name)) {
              return `[name][extname]`; // Keep original filename
            }
            
            // Group assets by type
            if (['png', 'jpe?g', 'gif', 'svg', 'webp'].includes(ext)) {
              return 'assets/images/[name].[hash][extname]';
            }
            if (['woff2?', 'ttf', 'eot'].includes(ext)) {
              return 'assets/fonts/[name].[hash][extname]';
            }
            
            // Default asset path
            return 'assets/[name].[hash][extname]';
          }
        },
        // Ensure static files are copied as-is
        preserveEntrySignatures: 'strict',
        treeshake: isProduction,
      }
    },
    
    server: {
      port: 5173,
      host: true,
      open: true,
      strictPort: true,
      hmr: {
        clientPort: 5173,
        protocol: 'ws',
        host: 'localhost'
      },
      // Serve static files with proper headers
      headers: {
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin',
      },
      // Ensure static files are served with correct MIME types
      mimeTypes: {
        'text/plain': ['robots.txt'],
        'application/xml': ['sitemap.xml']
      }
    },
    
    preview: {
      port: 5173,
      strictPort: true,
      headers: {
        'Cache-Control': 'public, max-age=600',
        'Access-Control-Allow-Origin': '*',
      }
    },
    
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '~': resolve(__dirname, 'public')
      }
    },
    
    // Optimize dependencies
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'three',
        '@react-three/fiber',
        '@react-three/drei'
      ],
      esbuildOptions: {
        target: 'es2020'
      }
    },
    
    // Build optimization
    esbuild: {
      drop: isProduction ? ['console', 'debugger'] : [],
      minify: isProduction,
      target: 'es2020'
    }
  };
});
