document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const cards = gsap.utils.toArray(".destination-card");
  if (!cards.length) return;

  const pinTop = () => parseInt(getComputedStyle(cards[0]).top, 10) || 0;

  const headerPin = gsap.matchMedia();
  headerPin.add("(min-width: 901px)", () => {
    ScrollTrigger.create({
      trigger: ".destinations-header",
      start: "top top",
      endTrigger: ".destinations-stack",
      end: "bottom bottom",
      pin: true,
      pinSpacing: false,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    });
  });

  cards.forEach((card, i) => {
    const depth = cards.length - 1 - i;
    

    const bgImage = card.style.backgroundImage ? card : card.querySelector(".destination-card__img");
    if (bgImage) {
      gsap.fromTo(
        card,
        { backgroundPositionY: "30%" },
        {
          backgroundPositionY: "70%",
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }

    if (depth === 0) return; 

    const st = {
      trigger: card,
      start: () => `top ${pinTop() + (i * 4)}px`, // Stagger pin offset slightly for 10 cards depth visibility
      endTrigger: cards.at(-1),
      end: () => `top ${pinTop() + (i * 4)}px`,
      scrub: true,
      invalidateOnRefresh: true,
    };

    gsap.to(card, {
      scale: 1 - (0.04 * depth),
      y: -16 * depth,
      ease: "none",
      scrollTrigger: st,
    });

    const shade = card.querySelector(".destination-card__shade");
    if (shade) {
      gsap.to(shade, {
        opacity: Math.min(0.65, 0.15 + (0.05 * (cards.length - depth))),
        ease: "none",
        scrollTrigger: st,
      });
    }
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());
});

