import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function ScrollReveal({
  children,
  className = '',
  delay = 0,
  y = 22,
}) {
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current

    if (!element) return

    const mediaQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    if (mediaQuery.matches) return

    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          autoAlpha: 0,
          y,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 88%',
            once: true,
          },
        }
      )
    }, element)

    return () => context.revert()
  }, [delay, y])

  return (
    <div
      ref={elementRef}
      className={className}
    >
      {children}
    </div>
  )
}

export default ScrollReveal
