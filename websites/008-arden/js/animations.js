document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap === "undefined") {
    console.warn("GSAP was not loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion) return;

  function splitWords(element) {
    if (element.dataset.wordsSplit === "true") {
      return element.querySelectorAll(".word");
    }

    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT
    );

    const textNodes = [];
    let node;

    while ((node = walker.nextNode())) {
      if (node.textContent.trim()) {
        textNodes.push(node);
      }
    }

    textNodes.forEach((textNode) => {
      const fragment = document.createDocumentFragment();
      const parts = textNode.textContent.split(/(\s+)/);

      parts.forEach((part) => {
        if (!part) return;

        if (/^\s+$/.test(part)) {
          fragment.appendChild(document.createTextNode(part));
          return;
        }

        const word = document.createElement("span");
        word.className = "word";
        word.textContent = part;
        fragment.appendChild(word);
      });

      textNode.replaceWith(fragment);
    });

    element.dataset.wordsSplit = "true";

    return element.querySelectorAll(".word");
  }

  document.fonts.ready.then(() => {
    const headings = document.querySelectorAll(
      ".hero h1, .about__title, .mission__title, " +
      ".testimonials__title, .showcase__title, .contact__title"
    );

    headings.forEach((heading) => {
      const words = splitWords(heading);

      gsap.fromTo(
        words,
        {
          yPercent: 110,
          opacity: 0
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.055,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 88%",
            once: true
          }
        }
      );
    });

    const revealGroups = [
      ".about__description",
      ".about__link",
      ".about__stats",
      ".mission__badges",
      ".mission-card",
      ".testimonial-card",
      ".contact__form",
      ".contact__email",
      ".showcase__button"
    ];

    revealGroups.forEach((selector) => {
      const elements = document.querySelectorAll(selector);

      elements.forEach((element) => {
        gsap.fromTo(
          element,
          {
            y: 24,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 92%",
              once: true
            }
          }
        );
      });
    });

    const propertyCards = gsap.utils.toArray(
      ".property-card, .property"
    );

    propertyCards.forEach((card) => {
      gsap.fromTo(
        card,
        {
          y: 32,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            once: true
          }
        }
      );
    });

    const parallaxImages = document.querySelectorAll(
      ".hero__image, .about__image, .showcase__image"
    );

    parallaxImages.forEach((image) => {
      gsap.fromTo(
        image,
        { yPercent: -3 },
        {
          yPercent: 3,
          ease: "none",
          scrollTrigger: {
            trigger: image.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6
          }
        }
      );
    });

    ScrollTrigger.refresh();
  });

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});
