import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface GrainOverlayProps {
  opacity?: number
}

/**
 * Grain/noise overlay component for subtle texture
 */
export function GrainOverlay({ opacity = 0.03 }: GrainOverlayProps) {
  return (
    <div
      className="grain-overlay pointer-events-none fixed inset-0 z-[9000]"
      style={{ opacity }}
      aria-hidden="true"
    />
  )
}

/**
 * Scroll progress indicator component
 */
export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!progressRef.current) return

      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = scrollTop / docHeight

      gsap.to(progressRef.current, {
        height: `${scrollPercent * 100}%`,
        duration: 0.1,
        ease: 'power1.out',
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="fixed top-0 right-0 w-1 h-full bg-border z-[9999]">
      <div
        ref={progressRef}
        className="w-full bg-accent-cyan"
        style={{ height: '0%' }}
      />
    </div>
  )
}

/**
 * Scroll hint indicator that fades out on first scroll
 */
export function ScrollHint() {
  const hintRef = useRef<HTMLDivElement>(null)
  const hasScrolled = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!hintRef.current) return

      if (window.scrollY > 100 && !hasScrolled.current) {
        hasScrolled.current = true
        gsap.to(hintRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            if (hintRef.current) {
              hintRef.current.style.display = 'none'
            }
          },
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={hintRef}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9998] flex flex-col items-center gap-2"
    >
      <span className="text-xs uppercase tracking-widest text-muted-foreground">
        Scroll
      </span>
      <div className="w-px h-12 bg-gradient-to-b from-accent-cyan to-transparent animate-pulse" />
    </div>
  )
}
