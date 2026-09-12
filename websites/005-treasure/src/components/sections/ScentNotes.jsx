import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const notes = [
  {
    tier: "Top Note",
    label: "The First Impression",
    ingredients: ["Bergamot", "Pink Pepper", "Blood Orange"],
  },
  {
    tier: "Heart Note",
    label: "The Signature",
    ingredients: ["Peony", "Jasmine", "Iris"],
  },
  {
    tier: "Base Note",
    label: "What Remains",
    ingredients: ["Amber", "Sandalwood", "Musk"],
  },
];

export default function ScentNotes() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const introRef = useRef(null);
  const noteRefs = useRef([]);
  const lineRefs = useRef([]);
  const progressRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ---------------------------------------------
      // Heading
      // ---------------------------------------------

      gsap.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ---------------------------------------------
      // Intro
      // ---------------------------------------------

      gsap.fromTo(
        introRef.current,
        {
          opacity: 0,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ---------------------------------------------
      // Note rows
      // ---------------------------------------------

      noteRefs.current.forEach((el, i) => {
        const content = el.querySelector(".note-content");
        const number = el.querySelector(".note-number");
        const line = lineRefs.current[i];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
          defaults: {
            ease: "power3.out",
          },
        });

        tl.fromTo(
          line,
          {
            scaleX: 0,
          },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.out",
          }
        )
          .fromTo(
            number,
            {
              opacity: 0,
              y: 10,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
            },
            "-=0.4"
          )
          .fromTo(
            content.children,
            {
              opacity: 0,
              y: 18,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.08,
            },
            "-=0.25"
          );
      });

      // ---------------------------------------------
      // Connecting progress line
      // ---------------------------------------------

      gsap.fromTo(
        progressRef.current,
        {
          scaleY: 0,
        },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
            end: "bottom 55%",
            scrub: 1.5,
          },
        }
      );
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
          HEADER
      ============================================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          mb-20
          max-w-2xl
          text-center
          md:mb-28
        "
      >
        <h2
          ref={headingRef}
          className="
            font-heading
            text-4xl
            font-semibold
            leading-tight
            tracking-[-0.02em]
            text-charcoal
            sm:text-5xl
            md:text-6xl
          "
        >
          The Composition
        </h2>

        <p
          ref={introRef}
          className="
            mx-auto
            mt-5
            max-w-md
            font-body
            text-sm
            font-medium
            leading-7
            text-charcoal/60
            sm:text-base
            sm:leading-8
          "
        >
          A fragrance unfolds slowly — beginning with a first impression,
          revealing its heart, and leaving something behind.
        </p>
      </div>

      {/* ============================================
          NOTES
      ============================================= */}

      <div className="relative mx-auto max-w-4xl">
        {/* Connecting vertical line */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-10
            left-1/2
            top-10
            hidden
            w-px
            -translate-x-1/2
            bg-peach/20
            md:block
          "
        >
          <div
            ref={progressRef}
            className="
              h-full
              w-full
              origin-top
              bg-peach/60
            "
          />
        </div>

        <div className="relative flex flex-col gap-20 md:gap-28">
          {notes.map((note, i) => (
            <div
              key={note.tier}
              ref={(el) => (noteRefs.current[i] = el)}
              className="
                relative
                flex
                flex-col
                items-center
                text-center
              "
            >
              {/* Number */}

              <span
                className="
                  note-number
                  mb-5
                  font-body
                  text-[0.55rem]
                  font-semibold
                  tracking-[0.25em]
                  text-charcoal/35
                "
              >
                0{i + 1}
              </span>

              {/* Accent */}

              <div
                ref={(el) => (lineRefs.current[i] = el)}
                className="
                  mb-6
                  h-px
                  w-12
                  origin-center
                  scale-x-0
                  bg-peach
                "
              />

              {/* Content */}

              <div className="note-content flex flex-col items-center">
                <p
                  className="
                    font-body
                    text-[0.6rem]
                    font-semibold
                    uppercase
                    tracking-[0.28em]
                    text-charcoal/50
                  "
                >
                  {note.tier}
                </p>

                <h3
                  className="
                    mt-3
                    font-heading
                    text-2xl
                    font-semibold
                    leading-tight
                    text-charcoal
                    sm:text-3xl
                    md:text-4xl
                  "
                >
                  {note.label}
                </h3>

                <div
                  className="
                    mt-5
                    flex
                    flex-wrap
                    items-center
                    justify-center
                    gap-x-4
                    gap-y-2
                  "
                >
                  {note.ingredients.map((ingredient, index) => (
                    <span
                      key={ingredient}
                      className="
                        flex
                        items-center
                        gap-4
                        font-body
                        text-xs
                        font-medium
                        tracking-wide
                        text-charcoal/65
                        sm:text-sm
                      "
                    >
                      {ingredient}

                      {index < note.ingredients.length - 1 && (
                        <span className="h-1 w-1 rounded-full bg-peach" />
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================
          CLOSING DETAIL
      ============================================= */}

      <div className="mt-20 text-center md:mt-28">
        <p
          className="
            font-body
            text-[0.58rem]
            font-semibold
            uppercase
            tracking-[0.28em]
            text-charcoal/40
          "
        >
          From first breath to final trace
        </p>
      </div>
    </section>
  );
}