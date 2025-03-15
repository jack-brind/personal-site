import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'public/about.html'),
        kpis: resolve(__dirname, 'public/work/kpis.html'),
      },
    },
  },
});
