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

// Hero tagline word rotator
const heroRotator = document.getElementById('hero-rotator');

if (heroRotator) {
  const rotatorWords = ['Graphic Design', 'Web Development', 'App Development'];
  let rotatorIndex = 0;

  window.setInterval(() => {
    heroRotator.classList.add('rotator-out');
    window.setTimeout(() => {
      rotatorIndex = (rotatorIndex + 1) % rotatorWords.length;
      heroRotator.textContent = rotatorWords[rotatorIndex];
      heroRotator.classList.remove('rotator-out');
    }, 350);
  }, 2200);
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

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
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
