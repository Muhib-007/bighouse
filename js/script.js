// ===================================================
// Scroll-reveal via IntersectionObserver
// ===================================================
const revealEls = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // stagger children slightly for a smoother, orchestrated feel
      const delay = entry.target.dataset.revealDelay || 0;
      setTimeout(() => entry.target.classList.add('is-visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach((el, i) => {
  el.dataset.revealDelay = (i % 4) * 60;
  revealObserver.observe(el);
});

// ===================================================
// Header shrink-on-scroll (subtle)
// ===================================================
const header = document.querySelector('.site-header');
let lastY = window.scrollY;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.style.boxShadow = y > 8 ? '0 1px 0 rgba(0,0,0,.06)' : 'none';
  lastY = y;
}, { passive: true });

// ===================================================
// Logo strip: seamless auto-scroll marquee
// ===================================================
const track = document.querySelector('.logo-track');
if (track) {
  // duplicate content once for seamless looping
  track.innerHTML += track.innerHTML;
  track.style.width = 'max-content';
  track.style.animation = 'marquee 28s linear infinite';

  track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
  track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');

  const styleTag = document.createElement('style');
  styleTag.textContent = `
    @keyframes marquee {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
  `;
  document.head.appendChild(styleTag);
}

// ===================================================
// Gentle parallax on hero squiggle + portrait
// ===================================================
const heroSquiggle = document.querySelector('.hero-squiggle');
const portrait = document.querySelector('.hero-portrait');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (heroSquiggle) heroSquiggle.style.transform = `translateY(${y * 0.12}px)`;
  if (portrait) portrait.style.transform = `translateY(${y * 0.06}px)`;
}, { passive: true });
