import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://meet-zanzmera.vercel.app',
      dynamicRoutes: [],
      outDir: 'dist',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@data': resolve(__dirname, './src/data'),
      '@styles': resolve(__dirname, './src/styles'),
      '@utils': resolve(__dirname, './src/utils'),
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
          gsap: ['gsap'],
          vendor: ['react', 'react-dom', 'framer-motion', 'lenis'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['three', 'gsap', 'lenis'],
  },
})
