// Load marked from CDN
const markedScript = document.createElement('script');
markedScript.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
document.head.appendChild(markedScript);

/**
 * Loads and renders markdown content into a specified container
 * @param {string} markdownPath - Path to the markdown file
 * @param {string} containerId - ID of the container element where markdown should be rendered
 */
export async function loadAndRenderMarkdown(markdownPath, containerId) {
  console.log(`Loading markdown from: ${markdownPath}`);
  console.log(`Target container ID: ${containerId}`);

  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID "${containerId}" not found`);
    return;
  }

  // Ensure marked is loaded
  if (typeof marked === 'undefined') {
    await new Promise(resolve => {
      markedScript.onload = resolve;
    });
  }

  try {
    // Configure marked options
    const renderer = new marked.Renderer();

    // Override the image renderer to add figcaption
    renderer.image = function (src, title, alt) {
      let figureClass = 'markdown-figure';
      let imgClass = alt.includes('lightbox') ? 'lightbox-image' : '';

      // Clean the alt text by removing any class indicators
      let cleanAlt = alt.replace('lightbox', '').trim();

      return `
        <figure class="${figureClass}">
          <img src="${src}" alt="${cleanAlt}" class="${imgClass}" />
          ${cleanAlt ? `<figcaption>${cleanAlt}</figcaption>` : ''}
        </figure>
      `;
    };

    marked.use({
      gfm: true,
      breaks: true,
      renderer: renderer,
    });

    console.log(`Fetching markdown file: ${markdownPath}`);
    const response = await fetch(markdownPath);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch markdown file: ${response.status} ${response.statusText}`,
      );
    }

    const markdown = await response.text();
    console.log(`Markdown file loaded, length: ${markdown.length} characters`);

    // Parse the markdown to HTML
    const html = marked.parse(markdown);

    // Set the HTML content
    container.innerHTML = html;
    console.log('Markdown rendered successfully');

    // Initialize lightbox functionality for images
    initializeLightbox(container);
  } catch (error) {
    console.error('Error loading or rendering markdown:', error);
    container.innerHTML = `<div class="error-message">
      <h3>Error Loading Content</h3>
      <p>${error.message}</p>
    </div>`;
  }
}

/**
 * Initializes lightbox functionality for images in the container
 * @param {HTMLElement} container - The container element with images
 */
function initializeLightbox(container) {
  const lightboxImages = container.querySelectorAll('.lightbox-image');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');

  if (!lightbox || !lightboxImage) {
    console.warn(
      'Lightbox elements not found, skipping lightbox initialization',
    );
    return;
  }

  const openLightbox = (src, alt) => {
    lightboxImage.src = src;
    if (lightboxCaption) {
      lightboxCaption.textContent = alt;
    }
    lightbox.style.display = 'flex';

    // Add event listener to close lightbox when clicking outside the image
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Add event listener to close lightbox when pressing Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    });
  };

  const closeLightbox = () => {
    lightbox.style.display = 'none';

    // Remove event listeners
    lightbox.removeEventListener('click', closeLightbox);
    document.removeEventListener('keydown', closeLightbox);
  };

  // Add click event listeners to all lightbox images
  lightboxImages.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      openLightbox(img.src, img.alt);
    });
  });

  // Add click event listener to close button
  const closeButton = lightbox.querySelector('.lightbox-close');
  if (closeButton) {
    closeButton.addEventListener('click', closeLightbox);
  }
}
