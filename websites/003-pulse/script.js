document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Lenis Smooth Scroll
  const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Synchronize GSAP with Lenis
  gsap.registerPlugin(ScrollTrigger);
  lenis.on('scroll', ScrollTrigger.update);

  // 2. Split Text & Entrance Timeline
  const heroTitle = new SplitType('[data-split-text]', { types: 'lines, words, chars' });

  const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.4 } });

  tl.from('.site-header', { y: -50, opacity: 0 })
    .from(heroTitle.chars, { y: 100, opacity: 0, rotateX: -90, stagger: 0.03 }, "-=1")
    .from('.hero-kicker, .hero-description, .hero-cta', { y: 30, opacity: 0, stagger: 0.15 }, "-=1")
    .from('.hero-visual', { scale: 0.95, opacity: 0, duration: 1.6 }, "-=1.2");

  // 3. Interactive Mouse Parallax (currently: the hero athlete cutout)
  document.addEventListener('mousemove', (e) => {
    const { clientX: x, clientY: y } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    gsap.to('[data-parallax]', {
      x: (x - centerX) * 0.015,
      y: (y - centerY) * 0.015,
      duration: 1,
      ease: 'power2.out'
    });
  });
});