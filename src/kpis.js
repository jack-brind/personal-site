import { loadAndRenderMarkdown } from './markdown-renderer.js';

// Load the specific markdown file for this case study
document.addEventListener('DOMContentLoaded', () => {
  loadAndRenderMarkdown('/work/content/kpis.md', 'markdown-container');
});
