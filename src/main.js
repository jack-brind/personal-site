'use-strict';

import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
document
  .getElementById('linkedin-link')
  ?.addEventListener('click', function () {
    window.open('https://www.linkedin.com/in/jackbrind', '_blank');
  });

// mailto:
document.getElementById('email-link')?.addEventListener('click', function () {
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

  // About me button smooth scroll
  document
    .getElementById('about-me-btn')
    ?.addEventListener('click', function () {
      document
        .getElementById('about-sections')
        .scrollIntoView({ behavior: 'smooth' });
    });

  // Lightbox functionality
  const lightbox = document.querySelector('.lightbox');
  const lightboxContent = document.querySelector('.lightbox-content');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');
  const images = document.querySelectorAll('.lightbox-image');

  if (lightbox && lightboxContent && lightboxCaption && lightboxClose) {
    images.forEach(img => {
      img.addEventListener('click', function () {
        lightbox.style.display = 'block';
        lightboxContent.src = this.src;
        lightboxContent.alt = this.alt;
        // Get the figcaption text from the parent figure element
        const figure = this.closest('figure');
        const caption = figure
          ? figure.querySelector('figcaption')?.textContent
          : this.alt;
        lightboxCaption.textContent = caption || this.alt;

        // Add show class after a brief delay to trigger transition
        setTimeout(() => {
          lightbox.classList.add('show');
        }, 10);
      });
    });

    // Close lightbox when clicking close button or outside the image
    function closeLightbox() {
      lightbox.classList.remove('show');
      setTimeout(() => {
        lightbox.style.display = 'none';
      }, 300); // Match the transition duration
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      // Only prevent closing if clicking the close button
      if (e.target.closest('.lightbox-close')) {
        return;
      }
      closeLightbox();
    });

    // Close on escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.style.display === 'block') {
        closeLightbox();
      }
    });
  }

  // About page section animations
  const aboutSections = document.querySelectorAll('.about__section');
  if (aboutSections.length > 0) {
    // Reset initial state
    aboutSections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
    });

    // Trigger animations
    setTimeout(() => {
      aboutSections.forEach((section, index) => {
        setTimeout(() => {
          section.style.opacity = '1';
          section.style.transform = 'translateY(0)';
        }, index * 200); // 200ms delay between each section
      });
    }, 200); // Initial delay
  }

  // Hamburger Menu
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileDropdown = document.querySelector('.mobile-dropdown');

  if (hamburgerBtn && mobileDropdown) {
    hamburgerBtn.addEventListener('click', function (e) {
      e.stopPropagation(); // Prevent immediate propagation
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      mobileDropdown.classList.toggle('show');

      // Only add the event listener if we're opening the dropdown
      if (!expanded) {
        // Add a small delay to prevent immediate triggering
        setTimeout(() => {
          document.addEventListener('click', closeDropdown);
        }, 10);
      }
    });

    // Define the closeDropdown function outside the event handler
    function closeDropdown(e) {
      if (
        !hamburgerBtn.contains(e.target) &&
        !mobileDropdown.contains(e.target)
      ) {
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        mobileDropdown.classList.remove('show');
        document.removeEventListener('click', closeDropdown);
      }
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const skills = [
    'Web design',
    'Mobile design',
    'Desktop design',
    'Figma',
    'Design systems',
    'Interaction design',
    'Design thinking',
    'Design leadership',
    'Product strategy',
    'Product ownership',
    'Collaboration',
    'Accessibility',
    'HTML',
    'CSS',
    'UI / UX design',
    'Technical writing',
    'User Research',
    'Prototyping',
    'Product growth',
  ];

  const container = document.querySelector('.skills-container');

  if (container) {
    container.innerHTML = skills
      .map(skill => `<span class="skill-pill">${skill}</span>`)
      .join('');
  }
});

// Segment control functionality
document.addEventListener('DOMContentLoaded', () => {
  const tldrSection = document.getElementById('tldr');
  const deepDiveSection = document.getElementById('deep-dive');
  const segmentOptions = document.querySelectorAll('.segment-control__option');
  const readTimeElement = document.getElementById('read-time');
  const mainContent = document.querySelector('main');

  // Check if we're on the KPI page
  const isKpiPage = window.location.pathname.includes('kpis.html');

  // Initially show content based on page
  if (tldrSection) {
    tldrSection.style.display = isKpiPage ? 'none' : 'block';
  }
  if (deepDiveSection) {
    deepDiveSection.style.display = isKpiPage ? 'block' : 'none';
  }
  if (mainContent) {
    mainContent.setAttribute('data-segment', isKpiPage ? 'deep-dive' : 'tldr');
  }

  // Set initial read time based on page
  if (readTimeElement) {
    const activeOption = document.querySelector(
      `.segment-control__option${isKpiPage ? '.segment-control__option--active' : ''}[data-read-time]`,
    );
    if (activeOption) {
      const readTime = activeOption.getAttribute('data-read-time');
      readTimeElement.textContent = `${readTime} read`;
    }
  }

  // Function to update read time
  const updateReadTime = readTime => {
    if (readTimeElement) {
      readTimeElement.textContent = `${readTime} read`;
    }
  };

  // Add smooth scrolling for contents panel links
  const contentsLinks = document.querySelectorAll('.contents-panel__link');
  contentsLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  segmentOptions.forEach(option => {
    option.addEventListener('click', () => {
      // Remove active class from all options
      segmentOptions.forEach(opt => {
        opt.classList.remove('segment-control__option--active');
      });

      // Add active class to clicked option
      option.classList.add('segment-control__option--active');

      // Update read time
      const readTime = option.getAttribute('data-read-time');
      updateReadTime(readTime);

      // Show/hide appropriate section and update contents panel
      const isDeepDive = option.textContent.trim() === 'Deep dive';

      if (tldrSection) {
        tldrSection.style.display = isDeepDive ? 'none' : 'block';
      }
      if (deepDiveSection) {
        deepDiveSection.style.display = isDeepDive ? 'block' : 'none';
      }
      if (mainContent) {
        mainContent.setAttribute(
          'data-segment',
          isDeepDive ? 'deep-dive' : 'tldr',
        );
      }
    });
  });
});

inject();
injectSpeedInsights();

const navLeft = document.querySelector('.nav__left');

navLeft.addEventListener('click', function () {
  window.location.href = '/';
  console.log('clicked');
});

// Mobile navigation
const burgerButton = document.querySelector('.nav__burger');
const mobileNav = document.querySelector('.nav__mobile');

burgerButton.addEventListener('click', () => {
  burgerButton.classList.toggle('is-active');
  mobileNav.classList.toggle('is-open');
});

// Close mobile menu when clicking outside
document.addEventListener('click', e => {
  if (!mobileNav.contains(e.target) && !burgerButton.contains(e.target)) {
    burgerButton.classList.remove('is-active');
    mobileNav.classList.remove('is-open');
  }
});
