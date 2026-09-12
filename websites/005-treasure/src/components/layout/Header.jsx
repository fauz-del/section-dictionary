import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const navItems = ["Collection", "Story", "Notes", "Contact"];

export default function Header() {
  const logoRef = useRef(null);
  const navRefs = useRef([]);
  const menuRef = useRef(null);
  const mobileNavRefs = useRef([]);
  const lastScrollY = useRef(0);
  const hidden = useRef(false);

  const [menuOpen, setMenuOpen] = useState(false);

  // ---------------------------------------------
  // Initial entrance animation
  // ---------------------------------------------
  useEffect(() => {
    const tl = gsap.timeline({
      defaults: {
        ease: "power4.out",
      },
    });

    tl.fromTo(
      logoRef.current,
      {
        opacity: 0,
        x: -25,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
      }
    ).fromTo(
      navRefs.current,
      {
        opacity: 0,
        x: 35,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.65,
        stagger: 0.1,
      },
      "-=0.45"
    );

    return () => {
      tl.kill();
    };
  }, []);

  // ---------------------------------------------
  // Scroll behavior
  // ---------------------------------------------
  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) return;

      const y = window.scrollY;
      const goingDown = y > lastScrollY.current && y > 80;

      if (goingDown && !hidden.current) {
        hidden.current = true;

        gsap.to([logoRef.current, ...navRefs.current], {
          opacity: 0,
          y: -20,
          duration: 0.4,
          stagger: 0.04,
          ease: "power2.in",
        });
      }

      if (!goingDown && hidden.current) {
        hidden.current = false;

        gsap.to(logoRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        });

        gsap.to(navRefs.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: "power3.out",
        });
      }

      lastScrollY.current = y;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuOpen]);

  // ---------------------------------------------
  // Mobile menu animation
  // ---------------------------------------------
  useEffect(() => {
    if (!menuRef.current) return;

    if (menuOpen) {
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      tl.set(menuRef.current, {
        pointerEvents: "auto",
      })
        .to(menuRef.current, {
          opacity: 1,
          duration: 0.45,
        })
        .fromTo(
          mobileNavRefs.current,
          {
            opacity: 0,
            x: -30,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.65,
            stagger: 0.1,
          },
          "-=0.15"
        );
    } else {
      document.body.style.overflow = "";

      gsap.to(mobileNavRefs.current, {
        opacity: 0,
        x: -15,
        duration: 0.25,
        stagger: 0.04,
        ease: "power2.in",
      });

      gsap.to(menuRef.current, {
        opacity: 0,
        duration: 0.3,
        delay: 0.08,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(menuRef.current, {
            pointerEvents: "none",
          });
        },
      });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* Header */}
      <header
        className="
          fixed
          top-0
          left-0
          z-50
          w-full
          flex
          items-center
          justify-between
          px-6
          py-5
          md:px-16
          md:py-6
        "
      >
        {/* Logo */}
        <a
          ref={logoRef}
          href="#home"
          className="
            relative
            z-[60]
            font-logo
            text-[2.15rem]
            leading-none
            text-charcoal
            select-none
          "
        >
          Treasure
        </a>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-9 md:flex">
          {navItems.map((item, i) => (
            <a
              key={item}
              ref={(el) => {
                navRefs.current[i] = el;
              }}
              href={`#${item.toLowerCase()}`}
              className="
                group
                relative
                py-2
                font-body
                text-[0.72rem]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-charcoal
              "
            >
              {item}

              {/* Animated underline */}
              <span
                className="
                  absolute
                  bottom-0
                  left-0
                  h-[1px]
                  w-full
                  origin-left
                  scale-x-0
                  bg-peach
                  transition-transform
                  duration-500
                  ease-[cubic-bezier(0.16,1,0.3,1)]
                  group-hover:scale-x-100
                "
              />
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="
            relative
            z-[60]
            flex
            h-11
            w-11
            items-center
            justify-center
            text-charcoal
            md:hidden
          "
        >
          <span
            className={`
              absolute
              h-px
              w-6
              bg-current
              transition-transform
              duration-500
              ${
                menuOpen
                  ? "rotate-45"
                  : "-translate-y-[4px]"
              }
            `}
          />

          <span
            className={`
              absolute
              h-px
              w-6
              bg-current
              transition-transform
              duration-500
              ${
                menuOpen
                  ? "-rotate-45"
                  : "translate-y-[4px]"
              }
            `}
          />
        </button>
      </header>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className="
          fixed
          inset-0
          z-40
          flex
          flex-col
          justify-center
          bg-cream
          opacity-0
          pointer-events-none
          md:hidden
        "
      >
        <div
          className="
            absolute
            left-6
            top-1/2
            h-px
            w-8
            -translate-y-1/2
            bg-peach
          "
        />

        <nav className="flex flex-col px-16">
          {navItems.map((item, i) => (
            <a
              key={item}
              ref={(el) => {
                mobileNavRefs.current[i] = el;
              }}
              href={`#${item.toLowerCase()}`}
              onClick={closeMenu}
              className="
                group
                relative
                w-fit
                py-4
                font-heading
                text-4xl
                tracking-wide
                text-charcoal
                sm:text-5xl
              "
            >
              {item}

              <span
                className="
                  absolute
                  bottom-2
                  left-0
                  h-px
                  w-full
                  origin-left
                  scale-x-0
                  bg-peach
                  transition-transform
                  duration-500
                  group-hover:scale-x-100
                "
              />
            </a>
          ))}
        </nav>

        <p
          className="
            absolute
            bottom-8
            left-8
            font-body
            text-[0.6rem]
            font-medium
            uppercase
            tracking-[0.22em]
            text-charcoal/60
          "
        >
          Treasure — Fragrance & Essence
        </p>
      </div>
    </>
  );
}