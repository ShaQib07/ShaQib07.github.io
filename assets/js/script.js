// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle (dark default, persisted)
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const next = isLight ? 'dark' : 'light';
  if (next === 'light') document.documentElement.setAttribute('data-theme', 'light');
  else document.documentElement.removeAttribute('data-theme');
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// Nav: scrolled state, progress bar, active link
const nav = document.getElementById('nav');
const progress = document.getElementById('scrollProgress');
const sections = Array.from(document.querySelectorAll('main section[id]'));
const navAnchors = Array.from(document.querySelectorAll('.nav-links a'));

const onScroll = () => {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 24);

  const docH = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (docH > 0 ? (y / docH) * 100 : 0) + '%';

  let current = sections[0] ? sections[0].id : '';
  for (const sec of sections) {
    if (y >= sec.offsetTop - 140) current = sec.id;
  }
  if (docH > 0 && y >= docH - 4 && sections.length) current = sections[sections.length - 1].id;
  navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll, { passive: true });

// Mobile menu
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  navToggle.classList.remove('open');
}));

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}

// Custom cursor (pointer devices only)
const cursor = document.getElementById('cursor');
if (cursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  let cx = window.innerWidth / 2, cy = window.innerHeight / 2, tx = cx, ty = cy;
  window.addEventListener('mousemove', (e) => {
    tx = e.clientX; ty = e.clientY;
    cursor.classList.add('on');
  });
  const loop = () => {
    cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  };
  loop();
  document.addEventListener('mouseleave', () => cursor.classList.remove('on'));
  document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}
