import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const formRef = useRef(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
        defaults: {
          ease: "power3.out",
        },
      });

      tl.from(eyebrowRef.current, {
        opacity: 0,
        y: 15,
        duration: 0.6,
      })
        .from(
          titleRef.current,
          {
            opacity: 0,
            y: 25,
            duration: 0.8,
          },
          "-=0.3"
        )
        .from(
          descriptionRef.current,
          {
            opacity: 0,
            y: 15,
            duration: 0.6,
          },
          "-=0.45"
        )
        .from(
          formRef.current,
          {
            opacity: 0,
            y: 15,
            duration: 0.6,
          },
          "-=0.35"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) return;

    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-charcoal px-6 py-28 sm:px-10 sm:py-32 md:py-40"
    >
      {/* Soft atmospheric glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-peach/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          className="mb-6 font-body text-[10px] md:text-xs tracking-[0.35em] uppercase text-peach"
        >
          A Private Invitation
        </p>

        {/* Title */}
        <h2
          ref={titleRef}
          className="mx-auto max-w-xl font-heading text-3xl leading-tight text-cream sm:text-4xl md:text-5xl"
        >
          Stay close to Treasure.
        </h2>

        {/* Description */}
        <p
          ref={descriptionRef}
          className="mx-auto mt-6 max-w-md font-body text-sm leading-relaxed text-cream/60 md:text-base"
        >
          Receive news of new scents, quiet releases, and invitations
          reserved for those who know the house.
        </p>

        {/* Form */}
        <div ref={formRef} className="mx-auto mt-10 max-w-md">
          {submitted ? (
            <div className="border-t border-cream/15 pt-7">
              <p className="font-body text-sm tracking-wide text-cream/80">
                Thank you — you're now part of the house.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="flex items-center border-b border-cream/30 transition-colors duration-300 focus-within:border-peach">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  aria-label="Email address"
                  className="min-w-0 flex-1 bg-transparent px-1 py-4 font-body text-sm text-cream placeholder:text-cream/35 focus:outline-none"
                />

                <button
                  type="submit"
                  className="ml-4 shrink-0 font-body text-[10px] tracking-[0.2em] uppercase text-cream transition-colors duration-300 hover:text-peach"
                >
                  Enter
                </button>
              </div>

              <p className="mt-4 text-left font-body text-[10px] leading-relaxed text-cream/35">
                No noise. Only what is worth knowing.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}