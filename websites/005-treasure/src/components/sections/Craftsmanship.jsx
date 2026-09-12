import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import craftImg from "../../../assets/img/lifestyle/lifestyle-model-closeup.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function Craftsmanship() {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const detailRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 68%",
          toggleActions: "play none none reverse",
        },
        defaults: {
          ease: "power3.out",
        },
      });

      // ---------------------------------------------
      // Image reveal
      // ---------------------------------------------

      tl.fromTo(
        imageWrapRef.current,
        {
          clipPath: "inset(0 0 100% 0)",
        },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.25,
          ease: "power4.inOut",
        }
      );

      // ---------------------------------------------
      // Image scale
      // ---------------------------------------------

      tl.fromTo(
        imageRef.current,
        {
          scale: 1.08,
        },
        {
          scale: 1,
          duration: 1.6,
          ease: "power2.out",
        },
        "-=1"
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
          duration: 0.55,
        },
        "-=0.7"
      );

      // ---------------------------------------------
      // Title
      // ---------------------------------------------

      tl.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.3"
      );

      // ---------------------------------------------
      // Accent
      // ---------------------------------------------

      tl.fromTo(
        lineRef.current,
        {
          scaleX: 0,
          transformOrigin: "left center",
        },
        {
          scaleX: 1,
          duration: 0.65,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // ---------------------------------------------
      // Body
      // ---------------------------------------------

      tl.fromTo(
        bodyRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        "-=0.25"
      );

      // ---------------------------------------------
      // Detail
      // ---------------------------------------------

      tl.fromTo(
        detailRef.current,
        {
          opacity: 0,
          y: 12,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
        },
        "-=0.25"
      );

      // ---------------------------------------------
      // Image parallax
      // ---------------------------------------------

      gsap.to(imageRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-blush
        px-6
        py-28
        sm:px-10
        sm:py-32
        md:px-16
        md:py-40
        lg:px-20
      "
    >
      {/* ============================================
          SOFT ATMOSPHERE
      ============================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          top-1/2
          h-[500px]
          w-[500px]
          -translate-y-1/2
          rounded-full
          bg-white/25
          blur-3xl
        "
      />

      {/* ============================================
          MAIN CONTENT
      ============================================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          w-full
          max-w-6xl
          items-center
          gap-16
          md:grid-cols-[1.05fr_0.95fr]
          md:gap-20
          lg:gap-28
        "
      >
        {/* ==========================================
            IMAGE
        ========================================== */}

        <div
          ref={imageWrapRef}
          className="
            relative
            aspect-[4/5]
            w-full
            max-w-xl
            overflow-hidden
            md:order-1
          "
        >
          <img
            ref={imageRef}
            src={craftImg}
            alt="The craft behind Treasure"
            className="
              absolute
              -top-[10%]
              left-0
              h-[120%]
              w-full
              object-cover
              will-change-transform
            "
            loading="lazy"
          />

          {/* Soft frame */}

          <div
            className="
              pointer-events-none
              absolute
              inset-5
              border
              border-white/35
            "
          />

          {/* Image caption */}

          <span
            className="
              absolute
              bottom-5
              left-6
              font-body
              text-[0.52rem]
              font-semibold
              uppercase
              tracking-[0.25em]
              text-white/75
            "
          >
            Crafted with intention
          </span>
        </div>

        {/* ==========================================
            COPY
        ========================================== */}

        <div className="md:order-2">
          <p
            ref={eyebrowRef}
            className="
              font-body
              text-[0.62rem]
              font-semibold
              uppercase
              tracking-[0.3em]
              text-gold
            "
          >
            Our Craft
          </p>

          <h2
            ref={titleRef}
            className="
              mt-5
              font-heading
              text-4xl
              font-semibold
              leading-[1]
              tracking-[-0.025em]
              text-charcoal
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            "
          >
            Made by hand,
            <br />
            <span className="text-charcoal/80">
              made to last.
            </span>
          </h2>

          <div
            ref={lineRef}
            className="
              mt-8
              h-px
              w-16
              bg-peach
            "
          />

          <p
            ref={bodyRef}
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
            Every bottle is composed in small batches, blended by
            noses who treat fragrance as memory-making rather than
            manufacturing.
          </p>

          <p
            ref={detailRef}
            className="
              mt-6
              max-w-md
              font-body
              text-sm
              italic
              leading-7
              text-charcoal/55
              sm:text-base
            "
          >
            This is not fast luxury — it is patient, deliberate,
            and proud of the time it takes.
          </p>

          {/* Craft details */}

          <div
            className="
              mt-10
              flex
              flex-wrap
              gap-x-6
              gap-y-3
              border-t
              border-charcoal/10
              pt-6
            "
          >
            <span
              className="
                font-body
                text-[0.55rem]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-charcoal/45
              "
            >
              Small Batch
            </span>

            <span
              className="
                h-1
                w-1
                self-center
                rounded-full
                bg-peach
              "
            />

            <span
              className="
                font-body
                text-[0.55rem]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-charcoal/45
              "
            >
              Hand Blended
            </span>

            <span
              className="
                h-1
                w-1
                self-center
                rounded-full
                bg-peach
              "
            />

            <span
              className="
                font-body
                text-[0.55rem]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-charcoal/45
              "
            >
              Made With Intention
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}