(() => {
  "use strict";

  const highlightsGrid = document.querySelector(".highlights-grid");
  const highlightsNext = document.querySelector(".highlights-next");

  if (highlightsGrid && highlightsNext) {
    highlightsNext.addEventListener("click", () => {
      const firstHighlight = highlightsGrid.querySelector(".highlight-thumb");
      if (!firstHighlight) return;

      const styles = getComputedStyle(highlightsGrid);
      const gap = parseFloat(styles.columnGap || styles.gap) || 0;
      const behavior = matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
      highlightsGrid.scrollBy({
        left: firstHighlight.getBoundingClientRect().width + gap,
        behavior,
      });
    });
  }
  if (!window.gsap) return;

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const headline = $(".hero__headline");

  if (headline && !$(".word", headline)) {
    headline.setAttribute("aria-label", headline.textContent.replace(/\s+/g, " ").trim());

    const makeWord = (content) => {
      const mask = document.createElement("span");
      const inner = document.createElement("span");
      mask.className = "word";
      inner.className = "word-inner";
      mask.setAttribute("aria-hidden", "true");
      inner.append(content);
      mask.append(inner);
      return mask;
    };

    const frag = document.createDocumentFragment();
    [...headline.childNodes].forEach((node) => {
      if (node.nodeType === 3) {
        node.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) frag.append(" ");
          else frag.append(makeWord(document.createTextNode(part)));
        });
      } else if (node.nodeType === 1) {
        frag.append(makeWord(node));
      }
    });
    headline.replaceChildren(frag);
  }

  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const hero = $(".hero");
    const plane = $(".hero__plane");
    const chips = $$(".visual__label, .flight-route");
    const accent = $(".hero__headline .accent");
    const words = $$(".hero__headline .word-inner");
    const counter = $(".network-big-num");
    const isDesktop = matchMedia("(min-width: 901px)").matches;
    const canHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

    let onMove, onLeave;

    // Counter ("150+" -> counts up from 0)
    const counterText = counter ? counter.textContent : "";
    const counterTarget = counter ? parseInt(counterText, 10) : 0;
    const counterSuffix = counter ? counterText.replace(/[\d\s]/g, "") : "";
    const counterObj = { v: 0 };
    if (counter && counterTarget) counter.textContent = "0" + counterSuffix;

    // Plane: GSAP takes over the CSS transform (keep the same centering + tilt)
    if (plane) gsap.set(plane, { xPercent: -50, yPercent: -50, rotation: -5 });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: startAmbient,
    });

    const add = (targets, vars, pos) => {
      const t = gsap.utils.toArray(targets);
      if (t.length) tl.from(t, vars, pos);
    };

    add(".nav .logo, .nav .nav__actions",
      { y: -24, opacity: 0, duration: 0.8, stagger: 0.1, clearProps: "transform,opacity" }, 0.05);
    if (isDesktop) {
      add(".nav__links a",
        { y: -20, opacity: 0, duration: 0.7, stagger: 0.07, clearProps: "transform,opacity" }, 0.15);
    }

    /* Sky panel */
    add(".hero__main",
      { y: 40, scale: 0.985, duration: 1.2, clearProps: "transform" }, 0.1);

    /* Copy */
    add(".eyebrow", { x: -24, opacity: 0, duration: 0.8 }, 0.45);

    if (words.length) {
      tl.from(words, {
        yPercent: 115,
        rotation: 5,
        transformOrigin: "0% 100%",
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.1,
      }, 0.55);
    }

    if (accent) {
      tl.fromTo(accent, { "--u": 0 }, { "--u": 1, duration: 0.9, ease: "power2.inOut" }, 1.2);
    }

    add(".hero__description", { y: 26, opacity: 0, duration: 0.9 }, 0.95);
    add(".hero__actions > *", { y: 24, opacity: 0, duration: 0.8, stagger: 0.12 }, 1.1);
    add(".hero__social-proof", { y: 24, opacity: 0, duration: 0.8 }, 1.3);
    add(".avatar-stack > *",
      { scale: 0, duration: 0.6, ease: "back.out(2.2)", stagger: 0.08, clearProps: "transform" }, 1.45);

  
    add(".hero__visual",
      { y: 70, opacity: 0, scale: 0.95, duration: 1.3, clearProps: "transform,opacity" }, 0.35);

    if (plane) {
      tl.from(plane, {
        x: 50,            
        y: -10,            
        rotation: 2,     
        scale: 0.9,       
        opacity: 0,       
        duration: 1.6, 
        ease: "power2.out", 
      }, 0.75);
    }

    if (chips.length) {
      tl.from(chips, {
        y: 30, scale: 0.9, opacity: 0,
        duration: 0.9, ease: "back.out(1.6)", stagger: 0.18,
      }, 1.45);
    }
    add(".visual__coordinates", { opacity: 0, duration: 1 }, 1.9);

    add(".hero-footer-cards .hero-card",
      { y: 70, opacity: 0, duration: 1, stagger: 0.09, clearProps: "transform,opacity" }, 1.25);
    add(".card-icon",
      { scale: 0, rotation: -60, duration: 0.7, ease: "back.out(2)", stagger: 0.1, clearProps: "transform" }, 1.7);
    add(".flight-row",
      { x: -18, opacity: 0, duration: 0.6, stagger: 0.08, clearProps: "transform,opacity" }, 1.8);
    add(".highlight-thumb",
      { scale: 0.88, opacity: 0, duration: 0.6, stagger: 0.07, clearProps: "transform,opacity" }, 1.85);

    if (counter && counterTarget) {
      tl.to(counterObj, {
        v: counterTarget,
        duration: 1.6,
        ease: "power2.out",
        onUpdate: () => { counter.textContent = Math.round(counterObj.v) + counterSuffix; },
      }, 1.5);
    }

    /* Ambient loops + parallax, started once the intro finishes */
    function startAmbient() {
      if (plane) {
        gsap.to(plane, {
          yPercent: -53, rotation: -3.2,
          duration: 3.8, ease: "sine.inOut", yoyo: true, repeat: -1,
        });
      }

      chips.forEach((chip, i) => {
        gsap.to(chip, {
          y: i % 2 ? 8 : -8,
          duration: 3 + i * 0.6, delay: i * 0.4,
          ease: "sine.inOut", yoyo: true, repeat: -1,
        });
      });

      gsap.to(".eyebrow__dot", {
        scale: 1.8, opacity: 0.4,
        duration: 1, ease: "sine.inOut", yoyo: true, repeat: -1,
      });

      // Mouse parallax (desktop + real pointer only)
      if (plane && hero && isDesktop && canHover) {
        const px = gsap.quickTo(plane, "x", { duration: 1.2, ease: "power3" });
        const py = gsap.quickTo(plane, "y", { duration: 1.2, ease: "power3" });
        const cx = chips.map((c) => gsap.quickTo(c, "x", { duration: 1.6, ease: "power3" }));

        onMove = (e) => {
          const r = hero.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          px(nx * -34);
          py(ny * -22);
          cx.forEach((fn, i) => fn(nx * (i % 2 ? 26 : -26)));
        };
        onLeave = () => { px(0); py(0); cx.forEach((fn) => fn(0)); };

        hero.addEventListener("pointermove", onMove);
        hero.addEventListener("pointerleave", onLeave);
      }
    }

    return () => {
      if (hero && onMove) hero.removeEventListener("pointermove", onMove);
      if (hero && onLeave) hero.removeEventListener("pointerleave", onLeave);
      if (counter && counterText) counter.textContent = counterText;
    };
  });

  const nav = $(".nav");
  const toggle = nav && $(".menu-toggle", nav);
  const menu = nav && $(".nav__links", nav);

  if (toggle && menu) {
    mm.add("(max-width: 900px)", () => {
      const links = $$("a", menu);
      const bars = $$("span", toggle);
      const openSpeed = reduceMotion ? 50 : 1;
      const closeSpeed = reduceMotion ? 50 : 1.8;
      let isOpen = false;

      const shift = bars.length > 1
        ? Math.abs(bars[1].getBoundingClientRect().top - bars[0].getBoundingClientRect().top) / 2
        : 0;

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
        onReverseComplete: () => menu.classList.remove("open"),
      });

      tl.fromTo(menu,
          { clipPath: "inset(0% 0% 100% 0% round 14px)", autoAlpha: 0, y: -10 },
          { clipPath: "inset(0% 0% 0% 0% round 14px)", autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.inOut" }, 0)
        .fromTo(links,
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.07 }, 0.15);

      if (bars.length > 1) {
        tl.to(bars[0], { y: shift, rotation: 45, duration: 0.35 }, 0)
          .to(bars[1], { y: -shift, rotation: -45, duration: 0.35 }, 0);
      }

      const setOpen = (open) => {
        if (open === isOpen) return;
        isOpen = open;
        toggle.setAttribute("aria-expanded", String(open));
        if (open) {
          menu.classList.add("open");
          tl.timeScale(openSpeed).play();
        } else {
          tl.timeScale(closeSpeed).reverse();
        }
      };

      const onToggle = () => setOpen(!isOpen);
      const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
      const onDocClick = (e) => { if (isOpen && !nav.contains(e.target)) setOpen(false); };

      toggle.addEventListener("click", onToggle);
      links.forEach((a) => a.addEventListener("click", () => setOpen(false)));
      document.addEventListener("keydown", onKey);
      document.addEventListener("click", onDocClick);

      return () => {
        toggle.removeEventListener("click", onToggle);
        document.removeEventListener("keydown", onKey);
        document.removeEventListener("click", onDocClick);
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      };
    });
  }

})();

