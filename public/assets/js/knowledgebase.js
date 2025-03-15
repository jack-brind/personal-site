import { loadAndRenderMarkdown } from './markdown-renderer.js';

// Load the specific markdown file for this case study
document.addEventListener('DOMContentLoaded', () => {
  const markdownContainer = document.getElementById('markdown-container');
  if (markdownContainer) {
    loadAndRenderMarkdown(
      '/work/content/knowledgebase.md',
      'markdown-container',
    );
  }
});
