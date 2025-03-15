'use-strict';

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

// Change 'CV' to 'Resume' for en-US and en-CA
const userLocale = navigator.language || navigator.userLanguage;
const isResume = ['en-US', 'en-CA'].includes(userLocale);
document.getElementById('cv-viewer').innerHTML = isResume
  ? `Resume ${svgArrow}`
  : `CV ${svgArrow}`;

// Open LinkedIn profile in a separate tab
document.getElementById('linkedin-link').addEventListener('click', function () {
  window.open('https://www.linkedin.com/in/jackbrind', '_blank');
});

// CV viewer
document.getElementById('cv-viewer').addEventListener('click', function () {
  window.open('/assets/cv/Jack_Brind_CV.pdf', '_blank');
});

// mailto:
document.getElementById('email-link').addEventListener('click', function () {
  window.location.href = 'mailto:jack.brind91@gmail.com';
});

document.addEventListener('DOMContentLoaded', function () {
  // Get all images with the lightbox-image class
  const lightboxImages = document.querySelectorAll('.lightbox-image');
  const lightbox = document.querySelector('.lightbox');
  const lightboxContent = document.querySelector('.lightbox-content');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');

  // Function to close the lightbox
  const closeLightbox = () => {
    // Remove the show class to trigger the fade out transition
    lightbox.classList.remove('show');

    // Hide the lightbox after the transition completes
    setTimeout(() => {
      lightbox.style.display = 'none';
    }, 300); // Match this to your transition duration
  };

  // Add click event to each lightbox image
  lightboxImages.forEach(image => {
    image.addEventListener('click', function () {
      // Set the lightbox image source to the clicked image source
      lightboxContent.src = this.src;

      // Set the caption text from the alt attribute
      if (this.alt) {
        lightboxCaption.textContent = this.alt;
        lightboxCaption.style.display = 'block';
      } else {
        lightboxCaption.style.display = 'none';
      }

      // Display the lightbox
      lightbox.style.display = 'block';

      // Add the show class after a small delay to trigger the transition
      setTimeout(() => {
        lightbox.classList.add('show');
      }, 10);
    });
  });

  // Close lightbox when clicking the close button
  if (lightboxClose) {
    lightboxClose.addEventListener('click', function (e) {
      closeLightbox();
    });
  }

  // Close lightbox when clicking anywhere in the lightbox (including the image)
  lightbox.addEventListener('click', function () {
    closeLightbox();
  });
});
