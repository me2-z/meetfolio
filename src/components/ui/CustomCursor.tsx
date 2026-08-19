import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface CustomCursorProps {
  enabled?: boolean
}

/**
 * Custom cursor component with dot and trailing ring
 * Morphs on hover over interactive elements
 * Hidden on touch devices and when prefers-reduced-motion is set
 */
export function CustomCursor({ enabled = true }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for mobile/touch devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleResize = () => {
      checkMobile()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // Hide cursor on mobile, touch devices, or when reduced motion is preferred
    if (!enabled || isMobile || prefersReducedMotion) {
      return
    }

    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorRef.current || !dotRef.current || !ringRef.current) return

      // Move cursor container
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
      })

      // Dot follows instantly
      gsap.to(dotRef.current, {
        x: 0,
        y: 0,
        duration: 0,
      })

      // Ring follows with slight delay for trailing effect
      gsap.to(ringRef.current, {
        x: 0,
        y: 0,
        duration: 0.15,
        ease: 'power2.out',
      })
    }

    const handleMouseDown = () => {
      if (!ringRef.current) return
      gsap.to(ringRef.current, {
        scale: 0.8,
        duration: 0.1,
      })
    }

    const handleMouseUp = () => {
      if (!ringRef.current) return
      gsap.to(ringRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'elastic.out(1, 0.3)',
      })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor-hover]')
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = () => {
      setIsHovering(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [enabled, isMobile, prefersReducedMotion])

  // Don't render on mobile or when reduced motion is preferred
  if (!enabled || isMobile || prefersReducedMotion || !isVisible) {
    return null
  }

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      aria-hidden="true"
    >
      <div ref={dotRef} className="cursor-dot" />
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovering ? 'cursor-hover' : ''}`}
      />
    </div>
  )
}
