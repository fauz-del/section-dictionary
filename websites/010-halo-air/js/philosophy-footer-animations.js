(() => {
  "use strict";

  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const philosophy = document.querySelector(".philosophy-section");
  if (philosophy) {
    const headerItems = philosophy.querySelectorAll(".philosophy-header .section-eyebrow, .philosophy-header h2");
    const copyItems = philosophy.querySelectorAll(".philosophy-grid .philosophy-col > *, .philosophy-stat");
    const quoteItems = philosophy.querySelectorAll(".philosophy-quote, .philosophy-author");

    if (headerItems.length) {
      gsap.from(headerItems, {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: philosophy,
          start: "top 78%",
          once: true
        }
      });
    }

    if (copyItems.length) {
      gsap.from(copyItems, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: philosophy.querySelector(".philosophy-grid") || philosophy,
          start: "top 82%",
          once: true
        }
      });
    }

    if (quoteItems.length) {
      gsap.from(quoteItems, {
        y: 20,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: philosophy.querySelector(".philosophy-footer") || philosophy,
          start: "top 88%",
          once: true
        }
      });
    }
  }

  const footer = document.querySelector(".site-footer");
  if (footer) {
    const top = footer.querySelector(".footer-top");
    const columns = footer.querySelectorAll(".footer-col");
    const bottom = footer.querySelector(".footer-bottom");

    if (top) {
      gsap.from(top, {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 82%",
          once: true
        }
      });
    }

    if (columns.length) {
      gsap.from(columns, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer.querySelector(".footer-grid") || footer,
          start: "top 88%",
          once: true
        }
      });
    }

    if (bottom) {
      gsap.from(bottom, {
        y: 16,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bottom,
          start: "top 96%",
          once: true
        }
      });
    }
  }

  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
})();
