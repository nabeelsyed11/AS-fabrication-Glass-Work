/* ==========================================================================
   AS FABRICATION & GLASS WORK - INTERACTIVE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCounters();
  initGalleryFilter();
  initLightbox();
  initQuoteForm();
  initBackToTop();
});

/* --------------------------------------------------------------------------
   1. NAVBAR & MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Navbar background change on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy active link toggle
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    });

    // Close menu when clicking links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }
}

/* --------------------------------------------------------------------------
   2. STATS COUNTER ANIMATION
   -------------------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let started = false;

  const startCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const prefix = counter.getAttribute('data-prefix') || '';
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 2000; // ms
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.innerText = prefix + target + suffix;
          clearInterval(timer);
        } else {
          counter.innerText = prefix + Math.ceil(current) + suffix;
        }
      }, stepTime);
    });
  };

  // Trigger when stats section enters viewport
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started) {
        started = true;
        startCounters();
      }
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }
}

/* --------------------------------------------------------------------------
   3. GALLERY CATEGORY FILTERING
   -------------------------------------------------------------------------- */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. LIGHTBOX PREVIEW MODAL
   -------------------------------------------------------------------------- */
function initLightbox() {
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.querySelector('img').getAttribute('src');
      const title = item.querySelector('.gallery-title').innerText;
      const tag = item.querySelector('.gallery-tag').innerText;

      if (lightboxImg && lightboxCaption && lightboxModal) {
        lightboxImg.src = imgSrc;
        lightboxCaption.innerHTML = `<strong>${title}</strong> &bull; <span style="color: var(--accent-orange);">${tag}</span>`;
        lightboxModal.classList.add('active');
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   5. QUOTE FORM & WHATSAPP INTEGRATION
   -------------------------------------------------------------------------- */
function initQuoteForm() {
  const form = document.getElementById('quoteForm');
  const whatsappBtn = document.getElementById('sendWhatsappBtn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('formName').value.trim();
      const phone = document.getElementById('formPhone').value.trim();
      const service = document.getElementById('formService').value;
      const message = document.getElementById('formMessage').value.trim();

      if (!name || !phone) {
        alert('Please provide your name and phone number.');
        return;
      }

      // Display success feedback
      alert(`Thank you, ${name}! Your enquiry for ${service} has been received. Shanu Syed will contact you shortly.`);
      form.reset();
    });
  }

  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const name = document.getElementById('formName').value.trim() || 'Client';
      const phone = document.getElementById('formPhone').value.trim() || 'N/A';
      const service = document.getElementById('formService').value || 'Fabrication Work';
      const message = document.getElementById('formMessage').value.trim() || 'I am interested in getting a quote.';

      const formattedText = `Hi AS Fabrication & Glass Work,\nMy Name: ${name}\nPhone: ${phone}\nRequirement: ${service}\nDetails: ${message}`;
      const whatsappUrl = `https://wa.me/916362342460?text=${encodeURIComponent(formattedText)}`;

      window.open(whatsappUrl, '_blank');
    });
  }
}

/* --------------------------------------------------------------------------
   6. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}
