import { marked } from 'marked';

/**
 * Loads and renders markdown content into a specified container
 * @param {string} markdownPath - Path to the markdown file
 * @param {string} containerId - ID of the container element where markdown should be rendered
 */
export async function loadAndRenderMarkdown(markdownPath, containerId) {
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
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: true,
      renderer: renderer,
    });

    // Fetch the markdown file
    const response = await fetch(markdownPath);
    if (!response.ok) {
      throw new Error(
        `Failed to load markdown: ${response.status} ${response.statusText}`,
      );
    }

    // Get the text content
    const markdownText = await response.text();

    // Find the container
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with ID "${containerId}" not found`);
    }

    // Render the markdown
    container.innerHTML = marked.parse(markdownText);

    // Initialize lightbox for all images with the lightbox-image class
    initializeLightbox(container);

    // Add syntax highlighting if needed
    if (typeof Prism !== 'undefined') {
      Prism.highlightAllUnder(container);
    }
  } catch (error) {
    console.error('Error loading or rendering markdown:', error);
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = `<p class="error">Failed to load content: ${error.message}</p>`;
    }
  }
}

/**
 * Initializes lightbox functionality for images in a container
 * @param {HTMLElement} container - The container element with images
 */
function initializeLightbox(container) {
  const lightboxImages = container.querySelectorAll('.lightbox-image');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (lightbox && lightboxImg) {
    // Function to open the lightbox with animation
    const openLightbox = (src, alt) => {
      lightboxImg.src = src;

      // Set the caption text from the alt attribute
      if (alt) {
        lightboxCaption.textContent = alt;
        lightboxCaption.style.display = 'block';
      } else {
        lightboxCaption.style.display = 'none';
      }

      lightbox.style.display = 'block';

      // Explicitly set cursor on both the lightbox and the image
      lightbox.style.cursor = 'zoom-out';
      lightboxImg.style.cursor = 'zoom-out';

      // Trigger reflow before adding the class to ensure animation works
      void lightbox.offsetWidth;

      // Add show class to trigger animations
      lightbox.classList.add('show');

      // Prevent scrolling on the body while lightbox is open
      document.body.style.overflow = 'hidden';
    };

    // Function to close the lightbox with animation
    const closeLightbox = () => {
      lightbox.classList.remove('show');

      // Wait for the animation to complete before hiding
      setTimeout(() => {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
      }, 300); // Match this with the CSS transition time
    };

    // Add click event to all lightbox images
    lightboxImages.forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function () {
        openLightbox(this.src, this.alt);
      });
    });

    // Close lightbox when clicking the close button
    if (lightboxClose) {
      lightboxClose.addEventListener('click', function () {
        closeLightbox();
      });
    }

    // Close when clicking anywhere in the lightbox, including the image
    lightbox.addEventListener('click', function () {
      closeLightbox();
    });

    // Keep the escape key functionality
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('show')) {
        closeLightbox();
      }
    });
  }
}
