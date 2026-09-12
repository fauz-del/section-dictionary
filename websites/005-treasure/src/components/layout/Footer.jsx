import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = ["Collection", "Story", "Notes", "Contact"];
const socialLinks = ["Instagram", "Pinterest"];

export default function Footer() {
  const footerRef = useRef(null);
  const contentRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
        defaults: {
          ease: "power3.out",
        },
      });

      tl.from(logoRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
      })
        .from(
          linksRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
          },
          "-=0.45"
        )
        .from(
          bottomRef.current,
          {
            opacity: 0,
            duration: 0.6,
          },
          "-=0.25"
        );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-charcoal border-t border-cream/10 px-6 pt-20 pb-8 sm:px-10 md:px-16 md:pt-24"
    >
      {/* Very subtle atmosphere */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-peach/5 blur-3xl" />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto max-w-6xl"
      >
        {/* Main footer */}
        <div className="grid gap-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-12">
          {/* Brand */}
          <div ref={logoRef}>
            <span className="font-logo text-4xl text-cream sm:text-5xl">
              Treasure
            </span>

            <p className="mt-5 max-w-[240px] font-body text-sm leading-relaxed text-cream/45">
              A fragrance house for moments worth keeping.
            </p>

            <div className="mt-8 h-px w-10 bg-peach/70" />
          </div>

          {/* Explore */}
          <div ref={linksRef}>
            <p className="mb-5 font-body text-[10px] tracking-[0.3em] uppercase text-cream/35">
              Explore
            </p>

            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="group inline-flex items-center gap-2 font-body text-sm text-cream/65 transition-colors duration-300 hover:text-cream"
                  >
                    <span>{link}</span>
                    <span className="h-px w-0 bg-peach transition-all duration-300 group-hover:w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div ref={linksRef}>
            <p className="mb-5 font-body text-[10px] tracking-[0.3em] uppercase text-cream/35">
              Connect
            </p>

            <ul className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="group inline-flex items-center gap-2 font-body text-sm text-cream/65 transition-colors duration-300 hover:text-cream"
                  >
                    <span>{link}</span>
                    <span className="h-px w-0 bg-peach transition-all duration-300 group-hover:w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div ref={linksRef}>
            <p className="mb-5 font-body text-[10px] tracking-[0.3em] uppercase text-cream/35">
              Contact
            </p>

            <a
              href="mailto:hello@treasure.com"
              className="group inline-flex flex-col font-body text-sm text-cream/65 transition-colors duration-300 hover:text-cream"
            >
              <span>hello@treasure.com</span>

              <span className="mt-2 h-px w-0 bg-peach transition-all duration-300 group-hover:w-full" />
            </a>
          </div>
        </div>

        {/* Large closing statement */}
        <div className="mt-24 border-t border-cream/10 pt-10 text-center">
          <p className="font-heading text-xl text-cream/20 sm:text-2xl md:text-3xl">
            Moments worth keeping.
          </p>
        </div>

        {/* Bottom bar */}
        <div
          ref={bottomRef}
          className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-7 sm:flex-row"
        >
          <p className="font-body text-[10px] tracking-wide text-cream/30">
            © {new Date().getFullYear()} Treasure. All rights reserved.
          </p>

          <p className="font-body text-[10px] tracking-[0.15em] uppercase text-cream/30">
            Crafted with care
          </p>
        </div>
      </div>
    </footer>
  );
}

