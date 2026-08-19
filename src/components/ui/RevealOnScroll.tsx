import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface RevealOnScrollProps {
  children: React.ReactNode
  className?: string
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-up'
  duration?: number
  delay?: number
  threshold?: number
}

/**
 * Component that reveals content when it enters the viewport using GSAP ScrollTrigger
 */
export function RevealOnScroll({
  children,
  className = '',
  animation = 'fade-up',
  duration = 0.8,
  delay = 0,
  threshold = 0.1,
}: RevealOnScrollProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Set initial state based on animation type
    const setInitialState = () => {
      switch (animation) {
        case 'fade-up':
          gsap.set(element, { opacity: 0, y: 60 })
          break
        case 'fade-in':
          gsap.set(element, { opacity: 0 })
          break
        case 'slide-left':
          gsap.set(element, { opacity: 0, x: -60 })
          break
        case 'slide-right':
          gsap.set(element, { opacity: 0, x: 60 })
          break
        case 'scale-up':
          gsap.set(element, { opacity: 0, scale: 0.8 })
          break
      }
    }

    setInitialState()

    // Create ScrollTrigger animation
    const ctx = gsap.context(() => {
      gsap.to(element, {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration: duration,
        delay: delay,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    }, element)

    return () => {
      ctx.revert()
    }
  }, [animation, duration, delay])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}
