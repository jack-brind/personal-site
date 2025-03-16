import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'src/about.html'),
        kpis: resolve(__dirname, 'src/kpis.html'),
        knowledgebase: resolve(__dirname, 'src/knowledgebase.html'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    emptyOutDir: true,
  },
  assetsInclude: ['**/*.md'],
  publicDir: 'public',
  base: '',
});
