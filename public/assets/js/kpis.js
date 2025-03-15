import { loadAndRenderMarkdown } from './markdown-renderer.js';

console.log('KPIs script loaded');

// Load the specific markdown file for this case study
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM content loaded, initializing KPIs page');

  const markdownContainer = document.getElementById('markdown-container');
  if (markdownContainer) {
    console.log('Markdown container found, loading content');
    loadAndRenderMarkdown('/work/content/kpis.md', 'markdown-container').catch(
      error => {
        console.error('Error in KPIs page initialization:', error);
      },
    );
  } else {
    console.error('Markdown container not found');
  }
});
