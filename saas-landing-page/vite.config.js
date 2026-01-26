import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration for the SaaS Landing Page
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  
  // Development server settings
  server: {
    port: 3000,
    open: true, // Auto-open browser
  },
  
  // Build optimization settings
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: false,
    
    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'animation-vendor': ['framer-motion'],
        }
      }
    }
  },
  
  // Path aliases for cleaner imports
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@hooks': '/src/hooks',
    }
  }
})
