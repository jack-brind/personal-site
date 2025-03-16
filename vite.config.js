import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'src/about.html',
        kpis: 'src/kpis.html',
        knowledgebase: 'src/knowledgebase.html',
      },
    },
    emptyOutDir: true,
  },
  assetsInclude: ['**/*.md'],
  publicDir: 'public',
  base: '',
});
