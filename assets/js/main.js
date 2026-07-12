// Homepage preloader
const preloader = document.getElementById('preloader');

if (preloader) {
  document.body.classList.add('preloading');
  window.setTimeout(() => {
    preloader.classList.add('preloader-hidden');
    document.body.classList.remove('preloading');
    window.setTimeout(() => preloader.remove(), 600);
  }, 2000);
}

// Theme toggle (dark by default, persisted in localStorage)
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('gmc-theme', next);
});

// Mobile nav toggle (full-screen overlay, separate from the desktop inline nav)
const navToggle = document.getElementById('nav-toggle');
const mobileNavOverlay = document.getElementById('mobile-nav-overlay');

navToggle.addEventListener('click', () => {
  const isOpen = mobileNavOverlay.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('nav-open', isOpen);
});

mobileNavOverlay.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNavOverlay.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  });
});

// Shrink header on scroll
const siteHeader = document.querySelector('.site-header');

const updateHeaderScroll = () => {
  siteHeader.classList.toggle('scrolled', window.scrollY > 40);
};

updateHeaderScroll();
window.addEventListener('scroll', updateHeaderScroll, { passive: true });

// Reveal-on-scroll animation
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => observer.observe(el));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
