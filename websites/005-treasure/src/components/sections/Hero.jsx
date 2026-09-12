import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Mouse } from "lucide-react";

import heroImg from "../../../assets/img/hero/hero-quiet-peach.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);
  const detailsRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      // ------------------------------------------------
      // Initial image reveal
      // ------------------------------------------------
      tl.fromTo(
        imageRef.current,
        {
          scale: 1.08,
        },
        {
          scale: 1,
          duration: 2,
          ease: "power3.out",
        }
      );

      // ------------------------------------------------
      // Small brand label
      // ------------------------------------------------
      tl.fromTo(
        eyebrowRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        "-=1.35"
      );

      // ------------------------------------------------
      // Main heading
      // ------------------------------------------------
      tl.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
        },
        "-=0.45"
      );

      // ------------------------------------------------
      // Description
      // ------------------------------------------------
      tl.fromTo(
        descriptionRef.current,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        "-=0.55"
      );

      // ------------------------------------------------
      // CTA
      // ------------------------------------------------
      tl.fromTo(
        ctaRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        "-=0.4"
      );

      // ------------------------------------------------
      // Bottom details
      // ------------------------------------------------
      tl.fromTo(
        detailsRef.current,
        {
          opacity: 0,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.35"
      );

      // ------------------------------------------------
      // Scroll indicator
      // ------------------------------------------------
      tl.fromTo(
        scrollRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.8,
        },
        "-=0.2"
      );

      // ------------------------------------------------
      // Subtle image movement while scrolling
      // ------------------------------------------------
      gsap.to(imageRef.current, {
        yPercent: 8,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // ------------------------------------------------
      // Content gently leaves while scrolling
      // ------------------------------------------------
      gsap.to(contentRef.current, {
        y: -80,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "20% top",
          end: "75% top",
          scrub: 1,
        },
      });

      // ------------------------------------------------
      // Scroll indicator gently disappears
      // ------------------------------------------------
      gsap.to(scrollRef.current, {
        opacity: 0,
        y: 15,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "10% top",
          end: "30% top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="
        relative
        min-h-screen
        h-screen
        overflow-hidden
        bg-cream
      "
    >
      {/* ================================================
          HERO IMAGE
      ================================================= */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imageRef}
          src={heroImg}
          alt="Treasure signature fragrance"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
            will-change-transform
          "
        />

        {/* Very subtle readability layer */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-cream/35
            via-transparent
            to-transparent
          "
        />
      </div>

      {/* ================================================
          HERO CONTENT
      ================================================= */}
      <div
        ref={contentRef}
        className="
          relative
          z-10
          flex
          min-h-screen
          items-center
          px-6
          sm:px-10
          md:px-16
          lg:px-20
        "
      >
        <div className="w-full max-w-xl">
          {/* Eyebrow */}
          <div
            ref={eyebrowRef}
            className="
              mb-6
              flex
              items-center
              gap-3
              font-body
              text-[0.62rem]
              font-semibold
              uppercase
              tracking-[0.24em]
              text-charcoal
              md:mb-8
            "
          >
            <span className="h-px w-8 bg-peach" />

            <span>Treasure Fragrance</span>
          </div>

          {/* Main heading */}
          <h1
            ref={titleRef}
            className="
              font-heading
              text-[3.25rem]
              font-bold
              uppercase
              leading-[0.94]
              tracking-[-0.025em]
              text-charcoal
              sm:text-6xl
              md:text-7xl
              lg:text-[5.5rem]
            "
          >
            A scent
            <br />
            worth
            <br />
            remembering.
          </h1>

          {/* Description */}
          <p
            ref={descriptionRef}
            className="
              mt-7
              max-w-sm
              font-body
              text-sm
              font-medium
              leading-7
              text-charcoal/75
              sm:text-base
              sm:leading-7
            "
          >
            A signature fragrance crafted with warmth,
            character and unmistakable presence.
          </p>

          {/* CTA */}
          <div ref={ctaRef} className="mt-8">
            <a
              href="#collection"
              className="
                group
                inline-flex
                items-center
                gap-4
                border-b
                border-charcoal
                pb-3
                font-body
                text-[0.68rem]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-charcoal
              "
            >
              <span>Discover the collection</span>

              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="
                  transition-transform
                  duration-500
                  group-hover:translate-x-2
                "
              />
            </a>
          </div>
        </div>
      </div>

      {/* ================================================
          BOTTOM DETAILS
      ================================================= */}
      <div
        ref={detailsRef}
        className="
          absolute
          bottom-7
          left-6
          right-6
          z-10
          flex
          items-end
          justify-between
          sm:left-10
          sm:right-10
          md:left-16
          md:right-16
          lg:left-20
          lg:right-20
        "
      >
        {/* Left information */}
        <div
          className="
            hidden
            font-body
            text-[0.55rem]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-charcoal/65
            sm:block
          "
        >
          <span>Fine fragrance</span>
          <span className="mx-3 text-peach">•</span>
          <span>50 ml</span>
        </div>

        {/* Right information */}
        <div
          className="
            ml-auto
            font-body
            text-[0.55rem]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-charcoal/65
          "
        >
          No. 01
        </div>
      </div>

      {/* ================================================
          SCROLL INDICATOR
      ================================================= */}
      <div
        ref={scrollRef}
        className="
          absolute
          bottom-7
          left-1/2
          z-10
          hidden
          -translate-x-1/2
          items-center
          gap-2
          font-body
          text-[0.55rem]
          font-semibold
          uppercase
          tracking-[0.22em]
          text-charcoal/60
          sm:flex
        "
      >
        <Mouse
          size={14}
          strokeWidth={1.3}
        />

        <span>Scroll to discover</span>
      </div>
    </section>
  );
}