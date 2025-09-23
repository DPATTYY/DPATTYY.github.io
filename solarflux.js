// src/scripts/solarflux.js
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Ripple on .js-ripple elements */
function attachRipples() {
  if (prefersReduced) return;
  const els = document.querySelectorAll('.js-ripple');
  els.forEach(el => {
    el.style.overflow = 'hidden';
    el.addEventListener('click', e => {
      const rect = el.getBoundingClientRect();
      const ink = document.createElement('span');
      ink.className = 'sf-ink';
      const size = Math.max(rect.width, rect.height);
      ink.style.width = ink.style.height = `${size}px`;
      ink.style.left = `${e.clientX - rect.left - size/2}px`;
      ink.style.top  = `${e.clientY - rect.top  - size/2}px`;
      const c = el.dataset.rippleColor;
      if (c) ink.style.background = c;
      el.appendChild(ink);
      ink.addEventListener('animationend', () => ink.remove());
    });
  });
}

/** Scroll reveal for cards */
function revealOnScroll() {
  if (prefersReduced) return;
  const items = document.querySelectorAll('.sf-card');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.style.animation = 'sf-enter-bounce var(--dur-3) var(--ease-elastic-out) both';
        en.target.style.willChange = 'transform, opacity';
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(i => io.observe(i));
}

window.addEventListener('DOMContentLoaded', () => {
  attachRipples();
  revealOnScroll();
});
