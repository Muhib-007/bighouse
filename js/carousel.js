/* =========================================================
   WORK CAROUSEL — standalone JS
   1. Edit the DATA array below with your own projects.
   2. `link` is where clicking the card navigates to.
      Point it at your real case-study page/route.
========================================================= */

const DATA = [
  {
    title: "Acre Insight",
    desc: "Connecting land owners with renewable project partners",
    size: "tall", // "tall" or "wide"
    // Swap this for background-image: url('your-photo.jpg') once you have real assets
    background: "url('image/img1.png')",
    link: "project.html?slug=acre-insight"
  },
  {
    title: "Acre Insight",
    desc: "Connecting land owners with renewable project partners",
    size: "wide", // "tall" or "wide"
    // Swap this for background-image: url('your-photo.jpg') once you have real assets
    background: "url('image/work-2.png')",
    link: "project.html?slug=acre-insight"
  },
  {
    title: "Acre Insight",
    desc: "Connecting land owners with renewable project partners",
    size: "tall", // "tall" or "wide"
    // Swap this for background-image: url('your-photo.jpg') once you have real assets
    background: "url('image/work-3.png')",
    link: "project.html?slug=acre-insight"
  },
  {
    title: "The aaa Museum of Art",
    desc: "A digital experience reimagining how visitors discover 5,000 years of art",
    size: "wide",
    background: "url('image/img2.png')",
    link: "project.html?slug=the-metropolitan-museum"
  },
  {
    title: "The Met — Start with Art",
    desc: "A city-wide OOH campaign extending the museum's digital identity into the street",
    size: "tall",
    background: "url('image/img3.png')",
    link: "project.html?slug=the-met-start-with-art"
  },
  {
    title: "The Met — Start with Art",
    desc: "A city-wide OOH campaign extending the museum's digital identity into the street",
    size: "wide",
    background: "url('image/work-1.png')",
    link: "/new-project.html"
  },
];

(function initWorkCarousel() {
  const track = document.getElementById('wcTrack');
  const viewport = document.getElementById('wcViewport');
  if (!track || !viewport) return;

  // ---- build slides from DATA ----
  DATA.forEach((p) => {
    const slide = document.createElement('a');
    slide.className = `wc-slide wc-slide--${p.size}`;
    slide.href = p.link;
    slide.dataset.title = p.title;
    slide.dataset.desc = p.desc;
    slide.setAttribute('aria-label', `View case study: ${p.title}`);
    slide.innerHTML = `
      <div class="wc-slide-media" style="background:${p.background}"></div>
      <div class="wc-slide-hover"><span>View case study</span></div>
    `;
    track.appendChild(slide);
  });

  const slides = Array.from(track.children);
  const captionTitle = document.getElementById('wcCaptionTitle');
  const captionDesc = document.getElementById('wcCaptionDesc');
  const captionLink = document.getElementById('wcCaptionLink');
  const prevBtn = document.getElementById('wcPrev');
  const nextBtn = document.getElementById('wcNext');

  // ---- keep the caption in sync with whichever slide is centered ----
  function updateCaption() {
    const vpRect = viewport.getBoundingClientRect();
    const vpCenter = vpRect.left + vpRect.width / 2;
    let closest = slides[0];
    let closestDist = Infinity;
    slides.forEach((s) => {
      const r = s.getBoundingClientRect();
      const center = r.left + r.width / 2;
      const dist = Math.abs(center - vpCenter);
      if (dist < closestDist) { closestDist = dist; closest = s; }
    });
    captionTitle.textContent = closest.dataset.title;
    captionDesc.textContent = closest.dataset.desc;
    captionLink.href = closest.getAttribute('href');
    slides.forEach((s) => s.classList.toggle('is-active', s === closest));
  }

  // ---- prev / next buttons ----
  function scrollByCard(dir) {
    const card = slides[0];
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const amount = (card.getBoundingClientRect().width + gap) * dir;
    viewport.scrollBy({ left: amount, behavior: 'smooth' });
  }
  prevBtn.addEventListener('click', () => scrollByCard(-1));
  nextBtn.addEventListener('click', () => scrollByCard(1));

  let scrollTimeout;
  viewport.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateCaption, 80);
  }, { passive: true });
  window.addEventListener('resize', updateCaption);
  requestAnimationFrame(updateCaption);

  // ---- desktop click-and-drag to scroll ----
  // Deliberately does NOT use setPointerCapture: capturing the pointer
  // reroutes mouseup to the viewport instead of the slide, which silently
  // blocks the anchor's click event and breaks navigation.
  let isDown = false, startX = 0, startScroll = 0, dragged = false;

  viewport.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch') return; // native touch scrolling handles this
    isDown = true; dragged = false;
    startX = e.clientX;
    startScroll = viewport.scrollLeft;
  });

  window.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 4) {
      dragged = true;
      viewport.classList.add('is-dragging');
    }
    viewport.scrollLeft = startScroll - dx;
  });

  window.addEventListener('pointerup', () => { isDown = false; });

  // if the user actually dragged, cancel the click so it doesn't navigate
  slides.forEach((s) => {
    s.addEventListener('click', (e) => {
      if (dragged) {
        e.preventDefault();
        dragged = false;
        viewport.classList.remove('is-dragging');
      }
    });
  });
})();
