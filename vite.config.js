import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        kpis: resolve(__dirname, 'src/kpis/index.html'),
        knowledgebase: resolve(__dirname, 'src/knowledgebase/index.html'),
        complianceOverrides: resolve(
          __dirname,
          'src/compliance-overrides/index.html',
        ),
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
