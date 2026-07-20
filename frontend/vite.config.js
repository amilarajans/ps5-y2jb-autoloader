import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Library build: single IIFE file for the PS5 YouTube (Cobalt) app.
// Dev server: full SPA with mock autoload simulation.
export default defineConfig(({ mode }) => {
  const isLib = mode === 'production' || process.env.BUILD_TARGET === 'lib'

  if (isLib) {
    return {
      plugins: [react()],
      define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
      },
      build: {
        target: ['es2015', 'safari12'],
        outDir: 'dist',
        emptyOutDir: true,
        cssCodeSplit: false,
        // Inline font files into the IIFE CSS string for offline PS5 package
        assetsInlineLimit: 100000,
        lib: {
          entry: resolve(__dirname, 'src/bridge.jsx'),
          name: 'Y2JBAutoloaderUI',
          formats: ['iife'],
          fileName: () => 'ui.js',
        },
        rollupOptions: {
          output: {
            inlineDynamicImports: true,
            assetFileNames: 'ui.[ext]',
          },
        },
        minify: 'esbuild',
      },
    }
  }

  return {
    plugins: [react()],
    server: {
      port: 5173,
      open: true,
    },
    build: {
      target: ['es2015', 'safari12'],
      outDir: 'dist-preview',
    },
  }
})
