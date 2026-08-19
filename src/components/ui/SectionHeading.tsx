import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
  align?: 'left' | 'center' | 'right'
  animateOnMount?: boolean
}

/**
 * Reusable section heading component with optional subtitle
 * Supports animated reveal on mount
 */
export function SectionHeading({
  title,
  subtitle,
  className = '',
  align = 'left',
  animateOnMount = true,
}: SectionHeadingProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!animateOnMount) return

    const tl = gsap.timeline()

    // Animate title
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 40 })
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out',
      })
    }

    // Animate subtitle
    if (subtitleRef.current && subtitle) {
      gsap.set(subtitleRef.current, { opacity: 0, y: 20 })
      tl.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.6'
      )
    }

    return () => {
      tl.kill()
    }
  }, [subtitle, animateOnMount])

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <div className={`mb-12 ${alignmentClasses[align]} ${className}`}>
      <h2
        ref={titleRef}
        className="text-display-md font-display font-bold tracking-tight mb-4"
      >
        {title}
      </h2>
      {subtitle && (
        <p
          ref={subtitleRef}
          className="text-lg text-muted-foreground max-w-2xl font-body"
        >
          {subtitle}
        </p>
      )}
      {/* Decorative line */}
      <div
        ref={subtitle ? undefined : titleRef as any}
        className="w-24 h-px bg-accent-cyan mt-6"
        style={{
          marginLeft: align === 'center' ? '50%' : align === 'right' ? 'auto' : '0',
          transform: align === 'center' ? 'translateX(-50%)' : 'none',
          opacity: animateOnMount ? 0 : 1,
        }}
      />
    </div>
  )
}
