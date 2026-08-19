import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface PreloaderProps {
  onComplete: () => void
}

/**
 * Preloader component with counter 0→100 and wireframe 3D object assembling
 * On complete, triggers GSAP timeline curtain-reveal (clip-path) into the hero
 */
export function Preloader({ onComplete }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const curtainRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Animate counter from 0 to 100
    const duration = 2000 // 2 seconds
    const startTime = Date.now()

    const animateCounter = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth counter animation
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.floor(easedProgress * 100)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animateCounter)
      } else {
        // Counter complete, start curtain reveal
        setTimeout(() => {
          setIsComplete(true)
          animateCurtainReveal()
        }, 300)
      }
    }

    animateCounter()

    return () => {
      // Cleanup if needed
    }
  }, [])

  const animateCurtainReveal = () => {
    if (!curtainRef.current || !preloaderRef.current) return

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete()
      },
    })

    // Clip-path reveal animation
    tl.to(curtainRef.current, {
      clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
      duration: 1.2,
      ease: 'expo.inOut',
    })

    // Fade out preloader
    tl.to(
      preloaderRef.current,
      {
        opacity: 0,
        duration: 0.5,
      },
      '-=0.8'
    )

    // Set display none after animation
    tl.call(() => {
      if (preloaderRef.current) {
        preloaderRef.current.style.display = 'none'
      }
    })
  }

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center"
      aria-label="Loading"
      role="status"
    >
      {/* Curtain overlay for reveal */}
      <div
        ref={curtainRef}
        className="absolute inset-0 bg-background"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        }}
      />

      {/* Wireframe 3D object placeholder - will be replaced with actual Three.js canvas in Phase 2 */}
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 border border-accent-cyan/30 rounded-full animate-spin-slow" />
        <div className="absolute inset-4 border border-accent-cyan/50 rounded-full animate-spin-reverse" />
        <div className="absolute inset-8 border border-accent-cyan/70 rounded-full" />
      </div>

      {/* Counter */}
      <div className="text-display-lg font-display font-bold tracking-tighter">
        <span ref={counterRef}>{count.toString().padStart(3, '0')}</span>
        <span className="text-accent-cyan">%</span>
      </div>

      {/* Loading bar */}
      <div className="w-64 h-px bg-border mt-4 overflow-hidden">
        <div
          className="h-full bg-accent-cyan transition-all duration-100"
          style={{ width: `${count}%` }}
        />
      </div>

      {/* Status text */}
      <p className="text-sm text-muted-foreground mt-4 font-body">
        {count < 30 && 'Initializing...'}
        {count >= 30 && count < 70 && 'Loading assets...'}
        {count >= 70 && count < 100 && 'Preparing experience...'}
        {count === 100 && 'Ready'}
      </p>
    </div>
  )
}
