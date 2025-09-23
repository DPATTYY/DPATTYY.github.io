// solarflux.js
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Ripple on .js-ripple elements */
function attachRipples() {
  if (prefersReduced) return;
  const els = document.querySelectorAll('.js-ripple');
  els.forEach(el => {
    el.style.position = "relative";
    el.style.overflow = "hidden";
    el.addEventListener('click', e => {
      const rect = el.getBoundingClientRect();
      const ink = document.createElement('span');
      ink.className = 'sf-ink';
      const size = Math.max(rect.width, rect.height);
      ink.style.width = ink.style.height = `${size}px`;
      ink.style.left = `${e.clientX - rect.left - size/2}px`;
      ink.style.top  = `${e.clientY - rect.top  - size/2}px`;
      el.appendChild(ink);
      ink.addEventListener('animationend', () => ink.remove());
    });
  });
}

/** Reveal cards on scroll */
function revealOnScroll() {
  if (prefersReduced) return;
  const items = document.querySelectorAll('.sf-card');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.style.animation = 'sf-enter-bounce var(--dur-3) var(--ease-elastic-out) both';
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.2 });
  items.forEach(i => io.observe(i));
}

window.addEventListener('DOMContentLoaded', () => {
  attachRipples();
  revealOnScroll();
});
