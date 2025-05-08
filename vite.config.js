import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        kpis: resolve(__dirname, 'src/kpis.html'),
        sideProjects: resolve(__dirname, 'src/side-projects.html'),
        work: resolve(__dirname, 'src/work.html'),
        writing: resolve(__dirname, 'src/writing.html'),
        flashcards: resolve(__dirname, 'src/flashcards.html'),
        cuttingThroughComplexity: resolve(
          __dirname,
          'src/cutting-unnecessary-complexity.html',
        ),
        knowledgebase: resolve(__dirname, 'src/knowledgebase.html'),
        complianceOverrides: resolve(
          __dirname,
          'src/compliance-overrides.html',
        ),
        about: resolve(__dirname, 'src/about.html'),
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
