import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import lifestyleImg from "../../../assets/img/lifestyle/lifestyle-model-red-wall.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function LifestyleGallery() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power3.inOut",
        }
      )
        .fromTo(
          contentRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.35"
        );

      // Slow cinematic movement
      gsap.to(imageRef.current, {
        yPercent: -12,
        scale: 1.04,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[90vh] md:h-screen overflow-hidden bg-charcoal"
    >
      {/* Cinematic image */}
      <img
        ref={imageRef}
        src={lifestyleImg}
        alt="Treasure — the ritual"
        className="absolute inset-0 w-full h-[125%] -top-[12%] object-cover"
        loading="lazy"
      />

      {/* Soft cinematic overlay */}
      <div className="absolute inset-0 bg-charcoal/30" />

      {/* Slight bottom depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 via-transparent to-charcoal/10" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div
          ref={contentRef}
          className="flex flex-col items-center text-center max-w-3xl"
        >
          {/* Small brand statement */}
          <span className="mb-6 text-[10px] md:text-xs tracking-[0.35em] uppercase text-cream/75 font-body">
            The Treasure Ritual
          </span>

          {/* Decorative line */}
          <div
            ref={lineRef}
            className="w-14 h-px bg-peach mb-8 origin-center"
          />

          <p className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-cream leading-[1.15]">
            Some things aren't worn.
            <br />
            <span className="text-cream/90">
              They're kept close.
            </span>
          </p>

          <p className="mt-7 max-w-md font-body text-sm md:text-base leading-relaxed text-cream/75">
            Like a secret worth returning to.
          </p>
        </div>
      </div>
    </section>
  );
}