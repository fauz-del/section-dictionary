import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: "Ombre",
    img: "product-flagship-ombre.jpg",
    number: "01",
  },
  {
    name: "Gilded",
    img: "product-gold-leaf-cap.jpg",
    number: "02",
  },
  {
    name: "Noir",
    img: "product-black-label.jpg",
    number: "03",
  },
  {
    name: "Amber",
    img: "product-golden-amber.jpg",
    number: "04",
  },
  {
    name: "Pale Rose",
    img: "product-pale-round.jpg",
    number: "05",
  },
];

export default function Collection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const introRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
    
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

      gsap.fromTo(
        cardRefs.current,
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 62%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleEnter = (el) => {
    const image = el.querySelector(".collection-image");
    const label = el.querySelector(".card-label");
    const line = el.querySelector(".card-line");

    gsap.to(image, {
      scale: 1.055,
      duration: 1,
      ease: "power3.out",
    });

    gsap.to(label, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power3.out",
    });

    gsap.to(line, {
      scaleX: 1,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const handleLeave = (el) => {
    const image = el.querySelector(".collection-image");
    const label = el.querySelector(".card-label");
    const line = el.querySelector(".card-line");

    gsap.to(image, {
      scale: 1,
      duration: 0.9,
      ease: "power3.out",
    });

    gsap.to(label, {
      opacity: 0,
      y: 8,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(line, {
      scaleX: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

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
    
      <div
        className="
          mx-auto
          mb-16
          max-w-2xl
          text-center
          md:mb-20
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
          The Collection
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
          Five expressions of memory, each composed to leave
          something beautiful behind.
        </p>
      </div>
      
      <div
        className="
          mx-auto
          grid
          w-full
          max-w-6xl
          grid-cols-2
          gap-x-4
          gap-y-10
          sm:gap-x-6
          md:grid-cols-3
          md:gap-x-8
          md:gap-y-14
        "
      >
        {products.map((product, index) => (
          <div
            key={product.name}
            ref={(el) => (cardRefs.current[index] = el)}
            onMouseEnter={(e) => handleEnter(e.currentTarget)}
            onMouseLeave={(e) => handleLeave(e.currentTarget)}
            className={`
              group
              relative
              cursor-pointer
              overflow-hidden
              bg-blush
              ${index === 1 ? "md:mt-10" : ""}
              ${index === 4 ? "md:mt-10" : ""}
            `}
          >
            {/* Image */}

            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={
                  new URL(
                    `../../../assets/img/products/${product.img}`,
                    import.meta.url
                  ).href
                }
                alt={`${product.name} fragrance`}
                className="
                  collection-image
                  absolute inset-0
                  h-full
                  w-full
                  object-cover
                  will-change-transform
                  [backface-visibility:hidden]
                "
                loading="lazy"
              />

              {/* Soft overlay */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-charcoal/20
                  via-transparent
                  to-transparent
                  opacity-0
                  transition-opacity
                  duration-700
                  group-hover:opacity-100
                "
              />
              <span
                className="
                  absolute
                  left-4
                  top-4
                  font-body
                  text-[0.55rem]
                  font-semibold
                  tracking-[0.2em]
                  text-charcoal/50
                "
              >
                {product.number}
              </span>

              {/* Hover information */}

              <div
                className="
                  card-label
                  absolute
                  bottom-0
                  left-0
                  right-0
                  translate-y-2
                  bg-cream/95
                  px-4
                  py-5
                  opacity-0
                  backdrop-blur-sm
                "
              >
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p
                      className="
                        font-body
                        text-[0.52rem]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-charcoal/45
                      "
                    >
                      Eau de Parfum
                    </p>

                    <h3
                      className="
                        mt-1
                        font-heading
                        text-xl
                        text-charcoal
                        sm:text-2xl
                      "
                    >
                      {product.name}
                    </h3>
                  </div>

                  <span
                    className="
                      font-body
                      text-[0.55rem]
                      uppercase
                      tracking-[0.15em]
                      text-charcoal/50
                    "
                  >
                    Explore
                  </span>
                </div>

                <div
                  className="
                    card-line
                    mt-4
                    h-px
                    w-full
                    origin-left
                    scale-x-0
                    bg-peach
                  "
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}