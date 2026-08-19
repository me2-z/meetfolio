import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  onClick?: () => void
  'data-cursor-hover'?: string
}

/**
 * Magnetic button component that follows cursor slightly on hover
 * Uses GSAP for smooth magnetic effect
 */
export function MagneticButton({
  children,
  className = '',
  strength = 0.5,
  onClick,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const wrapperRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!button || !wrapperRef.current) return

      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY

      const moveX = deltaX * strength
      const moveY = deltaY * strength

      gsap.to(button, {
        x: moveX,
        y: moveY,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      if (!button || !wrapperRef.current) return

      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      })
    }

    button.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength])

  return (
    <span ref={wrapperRef} className="inline-block">
      {'onClick' in props ? (
        <button
          ref={buttonRef as React.RefObject<HTMLButtonElement>}
          className={`relative inline-flex items-center justify-center ${className}`}
          onClick={onClick}
          data-cursor-hover
          {...(props as any)}
        >
          {children}
        </button>
      ) : (
        <a
          ref={buttonRef as React.RefObject<HTMLAnchorElement>}
          className={`relative inline-flex items-center justify-center ${className}`}
          data-cursor-hover
          {...(props as any)}
        >
          {children}
        </a>
      )}
    </span>
  )
}
