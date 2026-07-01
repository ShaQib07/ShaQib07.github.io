// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle (dark default, persisted)
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const next = isLight ? 'dark' : 'light';
  if (next === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// Nav background, scroll progress, active link
const nav = document.getElementById('nav');
const progress = document.getElementById('scrollProgress');
const sections = Array.from(document.querySelectorAll('main section[id]'));
const navAnchors = Array.from(document.querySelectorAll('.nav-links a'));

const onScroll = () => {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 20);

  // progress bar
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (docH > 0 ? (y / docH) * 100 : 0) + '%';

  // active section link
  let current = sections[0] ? sections[0].id : '';
  for (const sec of sections) {
    if (y >= sec.offsetTop - 120) current = sec.id;
  }
  // near the bottom, force the last section active (it may sit past max scroll)
  if (docH > 0 && y >= docH - 4 && sections.length) {
    current = sections[sections.length - 1].id;
  }
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Scroll reveal animations
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}
