import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        style: resolve(__dirname, 'style.css'),
        about: resolve(__dirname, 'src/about.html'),
        kpis: resolve(__dirname, 'src/kpis.html'),
        knowledgebase: resolve(__dirname, 'src/knowledgebase.html'),
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  assetsInclude: ['**/*.md'],
  publicDir: 'public',
  base: '',
});
