document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const footer = document.querySelector(".cartoon-footer");
  const layers = gsap.utils.toArray(".layer[data-depth]");

  // 1. Smooth Scroll Parallax Layer Array Mapping
  layers.forEach((layer) => {
    const depth = parseFloat(layer.dataset.depth);
    const movement = -(footer.offsetHeight * depth * 0.2);

    gsap.to(layer, {
      y: movement,
      ease: "none",
      scrollTrigger: {
        trigger: footer,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  // 2. Continuous Micro Mouse Shift (Simulates a breathing 2D diorama)
  footer.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = footer.getBoundingClientRect();

    const xPercent = (clientX - left) / width - 0.5;
    const yPercent = (clientY - top) / height - 0.5;

    layers.forEach((layer) => {
      const depth = parseFloat(layer.dataset.depth);
      gsap.to(layer, {
        x: xPercent * (40 * depth),
        y: `+=${yPercent * (20 * depth)}`,
        duration: 0.8,
        ease: "power1.out",
        overwrite: "auto",
      });
    });
  });
});
