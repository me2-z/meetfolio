import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

/**
 * Hook to initialize and manage Lenis smooth scroll
 * Integrates with GSAP ScrollTrigger via requestAnimationFrame
 */
export function useLenis(options?: Partial<ConstructorParameters<typeof Lenis>[0]>) {
  const lenisRef = useRef<Lenis | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      ...options,
    })

    lenisRef.current = lenis

    // Integrate with GSAP ScrollTrigger
    const updateScrollTrigger = () => {
      if ((window as any).ScrollTrigger) {
        lenis.on('scroll', () => {
          ;(window as any).ScrollTrigger.update()
        })
      }
    }

    updateScrollTrigger()

    let animationFrameId: number

    const animate = (time: number) => {
      lenis.raf(time)
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)
    setIsReady(true)

    return () => {
      cancelAnimationFrame(animationFrameId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [options])

  return { lenis: lenisRef.current, isReady }
}

/**
 * Hook to programmatically scroll with Lenis
 */
export function useLenisScroll() {
  const scrollTo = (target: string | number | HTMLElement, options?: any) => {
    const lenisElement = document.querySelector('[data-lenis-scroll-wrapper]') as any
    if (lenisElement && lenisElement.lenis) {
      lenisElement.lenis.scrollTo(target, options)
    } else {
      if (typeof target === 'string') {
        const element = document.querySelector(target)
        element?.scrollIntoView({ behavior: 'smooth', ...options })
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth', ...options })
      } else {
        target.scrollIntoView({ behavior: 'smooth', ...options })
      }
    }
  }

  return { scrollTo }
}
