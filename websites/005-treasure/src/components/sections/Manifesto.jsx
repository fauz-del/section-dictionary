import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

import FloatingBotanicals from "../ui/FloatingBotanicals";

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const accentRef = useRef(null);
  const descriptionRef = useRef(null);
  const footerRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        defaults: {
          ease: "power4.out",
        },
      });

      // ---------------------------------------------
      // Decorative ring
      // ---------------------------------------------
      tl.fromTo(
        ringRef.current,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "power2.out",
        }
      );

      // ---------------------------------------------
      // Eyebrow
      // ---------------------------------------------
      tl.fromTo(
        eyebrowRef.current,
        {
          opacity: 0,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=1"
      );

      // ---------------------------------------------
      // Main statement
      // ---------------------------------------------
      tl.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.97,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
        },
        "-=0.25"
      );

      // ---------------------------------------------
      // Peach accent
      // ---------------------------------------------
      tl.fromTo(
        accentRef.current,
        {
          scaleX: 0,
          transformOrigin: "left center",
        },
        {
          scaleX: 1,
          duration: 0.7,
        },
        "-=0.55"
      );

      // ---------------------------------------------
      // Supporting copy
      // ---------------------------------------------
      tl.fromTo(
        descriptionRef.current,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.35"
      );

      // ---------------------------------------------
      // Bottom information
      // ---------------------------------------------
      tl.fromTo(
        footerRef.current,
        {
          opacity: 0,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        "-=0.3"
      );

      // ---------------------------------------------
      // Botanical movement
      // ---------------------------------------------
      gsap.utils.toArray(".floating-petal").forEach((el, i) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: i % 2 === 0 ? 20 : -20,
            rotate: 0,
          },
          {
            opacity: 1,
            y: i % 2 === 0 ? -15 : 15,
            rotate: i % 2 === 0 ? 3 : -3,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.to(el, {
          y: i % 2 === 0 ? -35 : 35,
          rotate: i % 2 === 0 ? 6 : -6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });

      // ---------------------------------------------
      // Ring rotation
      // ---------------------------------------------
      gsap.to(ringRef.current, {
        rotate: 8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="
        relative
        min-h-[90vh]
        overflow-hidden
        bg-cream
        px-6
        py-32
        sm:px-10
        md:min-h-screen
        md:px-16
        md:py-40
        lg:px-20
      "
    >
      {/* ============================================
          BACKGROUND ATMOSPHERE
      ============================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_50%_45%,rgba(234,192,174,0.20),transparent_38%)]
        "
      />

      {/* Decorative ring */}
      <div
        ref={ringRef}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[min(75vw,650px)]
          w-[min(75vw,650px)]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-peach/25
        "
      />

      {/* ============================================
          BOTANICALS
      ============================================= */}

      <FloatingBotanicals />

      {/* ============================================
          MAIN CONTENT
      ============================================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[65vh]
          max-w-5xl
          flex-col
          items-center
          justify-center
          text-center
        "
      >
        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          className="
            mb-8
            flex
            items-center
            gap-3
            font-body
            text-[0.6rem]
            font-semibold
            uppercase
            tracking-[0.28em]
            text-charcoal/60
          "
        >
          <span className="h-px w-8 bg-peach" />

          <span>Treasure / The Philosophy</span>

          <span className="h-px w-8 bg-peach" />
        </div>

        {/* Main manifesto */}
        <div ref={titleRef}>
          <p
            className="
              font-heading
              text-3xl
              font-semibold
              leading-[1.15]
              tracking-[-0.02em]
              text-charcoal
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
          "
          >
            A fragrance is not worn.
          </p>

          <p
            className="
              mt-2
              font-heading
              text-4xl
              font-bold
              uppercase
              leading-[1]
              tracking-[-0.025em]
              text-charcoal
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            "
          >
            It is remembered.
          </p>
        </div>

        {/* Accent */}
        <div
          ref={accentRef}
          className="
            mt-8
            h-px
            w-20
            bg-peach
          "
        />

        {/* Supporting statement */}
        <p
          ref={descriptionRef}
          className="
            mt-8
            max-w-lg
            font-body
            text-sm
            font-medium
            leading-7
            text-charcoal/70
            sm:text-base
            sm:leading-8
          "
        >
          Treasure exists for the moments worth keeping —
          fragrances created to become part of the memories
          you never want to lose.
        </p>

        {/* ============================================
            FOOTER DETAILS
        ============================================= */}

        <div
          ref={footerRef}
          className="
            mt-12
            flex
            flex-col
            items-center
            gap-5
            sm:flex-row
            sm:gap-8
          "
        >
          <span
            className="
              font-body
              text-[0.58rem]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-charcoal/50
            "
          >
            Crafted with intention
          </span>

          <span className="hidden h-1 w-1 rounded-full bg-peach sm:block" />

          <a
            href="#notes"
            className="
              group
              flex
              items-center
              gap-2
              font-body
              text-[0.62rem]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-charcoal
            "
          >
            <span>Discover the notes</span>

            <ArrowDown
              size={14}
              strokeWidth={1.5}
              className="
                transition-transform
                duration-500
                group-hover:translate-y-1
              "
            />
          </a>
        </div>
      </div>
    </section>
  );
}