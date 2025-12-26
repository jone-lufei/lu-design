import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LuDesign',
      fileName: (format) => `lu-design.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'framer-motion'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          'framer-motion': 'FramerMotion',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'lu-design.css';
          return assetInfo.name || 'assets/[name][extname]';
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
  },
})
