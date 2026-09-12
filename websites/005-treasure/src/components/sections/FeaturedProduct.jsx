import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

import productImg from "../../../assets/img/products/product-peach-bow.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProduct() {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const notesRef = useRef(null);
  const detailsRef = useRef(null);
  const ctaRef = useRef(null);
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
          clipPath: "inset(0 100% 0 0)",
        },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.4,
          ease: "power4.inOut",
        }
      );

      // ---------------------------------------------
      // Image settles into place
      // ---------------------------------------------
      tl.fromTo(
        imageRef.current,
        {
          scale: 1.08,
        },
        {
          scale: 1,
          duration: 1.8,
          ease: "power2.out",
        },
        "-=1.2"
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
      // Main title
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
      // Accent line
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
        "-=0.45"
      );

      // ---------------------------------------------
      // Description
      // ---------------------------------------------
      tl.fromTo(
        descRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
        },
        "-=0.25"
      );

      // ---------------------------------------------
      // Fragrance notes
      // ---------------------------------------------
      tl.fromTo(
        notesRef.current,
        {
          opacity: 0,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.3"
      );

      // ---------------------------------------------
      // Product details
      // ---------------------------------------------
      tl.fromTo(
        detailsRef.current,
        {
          opacity: 0,
          y: 12,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        "-=0.3"
      );

      // ---------------------------------------------
      // CTA
      // ---------------------------------------------
      tl.fromTo(
        ctaRef.current,
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
        },
        "-=0.2"
      );

      // ---------------------------------------------
      // Subtle image parallax
      // ---------------------------------------------
      gsap.to(imageRef.current, {
        yPercent: -5,
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
        bg-cream
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
          SOFT BACKGROUND ATMOSPHERE
      ============================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[600px]
          w-[600px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-peach/10
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
            PRODUCT IMAGE
        ========================================== */}

        <div
          ref={imageWrapRef}
          className="
            relative
            mx-auto
            w-full
            max-w-xl
            overflow-hidden
            aspect-[4/5]
          "
        >
          <img
            ref={imageRef}
            src={productImg}
            alt="Treasure Eau de Parfum"
            className="
              h-full
              w-full
              object-cover
              will-change-transform
            "
            loading="lazy"
          />

          {/* Subtle inner frame */}
          <div
            className="
              pointer-events-none
              absolute
              inset-5
              border
              border-white/30
            "
          />
        </div>

        {/* ==========================================
            PRODUCT INFORMATION
        ========================================== */}

        <div
          className="
            flex
            max-w-xl
            flex-col
            justify-center
            md:pb-4
          "
        >
          {/* Eyebrow */}

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
            The Signature Scent
          </p>

          {/* Title */}

          <h2
            ref={titleRef}
            className="
              mt-5
              font-heading
              text-5xl
              font-semibold
              leading-[0.95]
              tracking-[-0.025em]
              text-charcoal
              sm:text-6xl
              md:text-6xl
              lg:text-7xl
            "
          >
            Treasure
            <span
              className="
                mt-3
                block
                font-heading
                text-2xl
                font-normal
                tracking-normal
                text-charcoal/60
                sm:text-3xl
              "
            >
              Eau de Parfum
            </span>
          </h2>

          {/* Accent */}

          <div
            ref={lineRef}
            className="
              mt-7
              h-px
              w-16
              bg-peach
            "
          />

          {/* Description */}

          <p
            ref={descRef}
            className="
              mt-7
              max-w-md
              font-body
              text-sm
              font-medium
              leading-7
              text-charcoal/70
              sm:text-base
              sm:leading-8
            "
          >
            A warm, amber-gold heart wrapped in soft floral notes —
            quiet on first breath, unforgettable by the last.
          </p>

          {/* Fragrance notes */}

          <div
            ref={notesRef}
            className="
              mt-9
              flex
              flex-wrap
              items-center
              gap-x-5
              gap-y-3
              font-body
              text-[0.6rem]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-charcoal/60
            "
          >
            <span>Amber</span>

            <span className="h-1 w-1 rounded-full bg-peach" />

            <span>Floral</span>

            <span className="h-1 w-1 rounded-full bg-peach" />

            <span>Musk</span>
          </div>

          {/* Product details */}

          <div
            ref={detailsRef}
            className="
              mt-6
              font-body
              text-[0.58rem]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-charcoal/45
            "
          >
            50 ML&nbsp;&nbsp; / &nbsp;&nbsp;EAU DE PARFUM
          </div>

          {/* CTA */}

          <a
            ref={ctaRef}
            href="#notes"
            className="
              group
              mt-10
              flex
              w-fit
              items-center
              gap-3
              border-b
              border-charcoal/40
              pb-2
              font-body
              text-[0.65rem]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-charcoal
              transition-colors
              duration-300
              hover:border-charcoal
            "
          >
            <span>Discover the scent</span>

            <ArrowRight
              size={14}
              strokeWidth={1.4}
              className="
                transition-transform
                duration-500
                group-hover:translate-x-1
              "
            />
          </a>
        </div>
      </div>
    </section>
  );
}