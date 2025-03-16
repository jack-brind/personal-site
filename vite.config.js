import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'src/about.html'),
        kpis: resolve(__dirname, 'src/kpis.html'),
        knowledgebase: resolve(__dirname, 'src/knowledgebase.html'),
      },
    },
  },
  // Ensure assets are properly processed
  assetsInclude: ['**/*.md'],
  // Ensure public directory is properly handled
  publicDir: 'public',
  // Add clean URLs
  appType: 'spa',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  // Add URL rewriting for development
  server: {
    proxy: {
      '/about': '/src/about.html',
      '/kpis': '/src/kpis.html',
      '/knowledgebase': '/src/knowledgebase.html',
    },
  },
});
