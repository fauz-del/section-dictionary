document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll("[data-count]");

  if (!counters.length) return;

  const animateCounter = (counter) => {
    if (counter.dataset.animated === "true") return;

    counter.dataset.animated = "true";

    const target = Number(counter.dataset.count);

    if (!Number.isFinite(target)) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      counter.textContent = target.toLocaleString("en-GB");
      return;
    }

    if (typeof gsap === "undefined") {
      counter.textContent = target.toLocaleString("en-GB");
      return;
    }

    const count = { value: 0 };

    gsap.to(count, {
      value: target,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => {
        counter.textContent = Math.round(count.value).toLocaleString("en-GB");
      }
    });
  };

  if (!("IntersectionObserver" in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.5
  });

  counters.forEach((counter) => observer.observe(counter));
});