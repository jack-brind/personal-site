'use-strict';

import { inject } from '@vercel/analytics';

const svgArrow = `
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="currentColor"
        class="header__button-icon"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1.24197 0.524784C1.24197 0.234954 1.47693 0 1.76676 0H5.47524C5.76507 0 6.00002 0.234954 6.00002 0.524784V4.24201C6.00002 4.53184 5.76507 4.76679 5.47524 4.76679C5.18541 4.76679 4.95045 4.53184 4.95045 4.24201V1.79173L0.895863 5.84633C0.690923 6.05127 0.358648 6.05127 0.153706 5.84633C-0.051235 5.64139 -0.0512355 5.30912 0.153705 5.10417L4.2083 1.04957H1.76676C1.47693 1.04957 1.24197 0.814615 1.24197 0.524784Z"
        />
      </svg>`;

// Get the modal
const modal = document.getElementById('imageModal');

// Function to open the modal
window.openModal = function (imgSrc, imgAlt) {
  const modal = document.getElementById('imageModal');
  modal.style.display = 'block';
  document.getElementById('modalImage').src = imgSrc;
  document.getElementById('imageCaption').innerHTML = imgAlt;
};

// Function to close the modal
window.closeModal = function () {
  const modal = document.getElementById('imageModal');
  modal.style.display = 'none';
};

// Close the modal when clicking outside of it
window.onclick = function (event) {
  const modal = document.getElementById('imageModal');
  if (event.target == modal) {
    closeModal();
  }
};

// Open LinkedIn profile in a separate tab
document.getElementById('linkedin-link').addEventListener('click', function () {
  window.open('https://www.linkedin.com/in/jackbrind', '_blank');
});

// mailto:
document.getElementById('email-link').addEventListener('click', function () {
  window.location.href = 'mailto:jack.brind91@gmail.com';
});

document.addEventListener('DOMContentLoaded', function () {
  // Change 'CV' to 'Resume' for en-US and en-CA
  const userLocale = navigator.language || navigator.userLanguage;
  const isResume = ['en-US', 'en-CA'].includes(userLocale);
  const cvViewer = document.getElementById('cv-viewer');
  if (cvViewer) {
    cvViewer.innerHTML = isResume ? `Resume ${svgArrow}` : `CV ${svgArrow}`;
  }

  // CV viewer
  document.getElementById('cv-viewer')?.addEventListener('click', function () {
    window.open('/assets/cv/Jack_Brind_CV.pdf', '_blank');
  });

  // Create lightbox if it doesn't exist
  let lightbox = document.querySelector('.lightbox');
  if (!lightbox) {
    // Create the lightbox structure
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';

    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'lightbox-close btn__icon--ghost';
    closeButton.innerHTML = `
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2.2636 2.2636C2.61508 1.91213 3.18492 1.91213 3.5364 2.2636L8 6.72721L12.4636 2.2636C12.8151 1.91213 13.3849 1.91213 13.7364 2.2636C14.0879 2.61508 14.0879 3.18492 13.7364 3.5364L9.27279 8L13.7364 12.4636C14.0879 12.8151 14.0879 13.3849 13.7364 13.7364C13.3849 14.0879 12.8151 14.0879 12.4636 13.7364L8 9.27279L3.5364 13.7364C3.18492 14.0879 2.61508 14.0879 2.2636 13.7364C1.91213 13.3849 1.91213 12.8151 2.2636 12.4636L6.72721 8L2.2636 3.5364C1.91213 3.18492 1.91213 2.61508 2.2636 2.2636Z"
        />
      </svg>
    `;

    // Create image element
    const lightboxContent = document.createElement('img');
    lightboxContent.className = 'lightbox-content';
    lightboxContent.id = 'lightbox-image';

    // Create caption
    const lightboxCaption = document.createElement('div');
    lightboxCaption.id = 'lightbox-caption';
    lightboxCaption.className = 'lightbox-caption';

    // Append elements to lightbox
    lightbox.appendChild(closeButton);
    lightbox.appendChild(lightboxContent);
    lightbox.appendChild(lightboxCaption);

    // Append lightbox to body
    document.body.appendChild(lightbox);

    // Add lightbox styles if not already present
    if (!document.getElementById('lightbox-styles')) {
      const style = document.createElement('style');
      style.id = 'lightbox-styles';
      style.textContent = `
        .lightbox {
          display: none;
          position: fixed;
          z-index: 1000;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgba(0, 0, 0, 0.9);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .lightbox.show {
          opacity: 1;
        }
        
        .lightbox-content {
          margin: auto;
          display: block;
          max-width: 90%;
          max-height: 90%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        .lightbox-caption {
          margin: auto;
          display: block;
          width: 80%;
          max-width: 700px;
          text-align: center;
          color: #ccc;
          padding: 10px 0;
          height: 150px;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
        }
        
        .lightbox-close {
          position: absolute;
          top: 15px;
          right: 35px;
          color: #f1f1f1;
          font-size: 40px;
          font-weight: bold;
          cursor: pointer;
          background: transparent;
          border: none;
          outline: none;
          z-index: 1001;
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Get all images with the lightbox-image class
  const lightboxImages = document.querySelectorAll('.lightbox-image');
  const lightboxContent =
    document.querySelector('.lightbox-content') ||
    document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');

  // Function to close the lightbox
  const closeLightbox = () => {
    // Remove the show class to trigger the fade out transition
    if (lightbox) {
      lightbox.classList.remove('show');

      // Hide the lightbox after the transition completes
      setTimeout(() => {
        lightbox.style.display = 'none';
      }, 300); // Match this to your transition duration
    }
  };

  // Add click event to each lightbox image
  lightboxImages.forEach(image => {
    image.style.cursor = 'pointer';
    image.addEventListener('click', function () {
      // Check if we're using the new lightbox
      if (lightbox) {
        // Set the lightbox image source to the clicked image source
        if (lightboxContent) {
          lightboxContent.src = this.src;
        }

        // Set the caption text from the alt attribute or figcaption if available
        let captionText = this.alt;

        // If image is inside a figure, try to get the figcaption text
        const parentFigure = this.closest('figure');
        if (parentFigure) {
          const figCaption = parentFigure.querySelector('figcaption');
          if (figCaption && figCaption.textContent) {
            captionText = figCaption.textContent;
          }
        }

        if (captionText && lightboxCaption) {
          lightboxCaption.textContent = captionText;
          lightboxCaption.style.display = 'block';
        } else if (lightboxCaption) {
          lightboxCaption.style.display = 'none';
        }

        // Display the lightbox
        lightbox.style.display = 'block';

        // Add the show class after a small delay to trigger the transition
        setTimeout(() => {
          lightbox.classList.add('show');
        }, 10);
      }
    });
  });

  // Close lightbox when clicking the close button
  if (lightboxClose) {
    lightboxClose.addEventListener('click', function (e) {
      e.stopPropagation(); // Prevent event from bubbling up
      closeLightbox();
    });
  }

  // Close lightbox when clicking anywhere in the lightbox (but not on the image)
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      // Only close if the click was directly on the lightbox background, not on the image
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Close lightbox with Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox && lightbox.style.display === 'block') {
      closeLightbox();
    }
  });
});
