import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface AnimatedTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  stagger?: number
  delay?: number
  animateOnMount?: boolean
}

/**
 * Animated text component that reveals characters or words with GSAP stagger
 * Free alternative to GSAP SplitText plugin
 */
export function AnimatedText({
  text,
  className = '',
  as: Component = 'p',
  stagger = 0.02,
  delay = 0,
  animateOnMount = true,
}: AnimatedTextProps) {
  const elementRef = useRef<HTMLElement>(null)
  const charsRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    if (!elementRef.current || !animateOnMount) return

    const element = elementRef.current
    const chars = text.split('')

    // Clear existing content
    element.innerHTML = ''
    charsRef.current = []

    // Create spans for each character
    chars.forEach((char, index) => {
      const span = document.createElement('span')
      span.textContent = char === ' ' ? '\u00A0' : char
      span.style.display = 'inline-block'
      span.style.opacity = '0'
      span.className = 'inline-block'
      element.appendChild(span)
      charsRef.current.push(span)
    })

    // Animate characters in
    const tl = gsap.timeline({ delay })

    tl.to(charsRef.current, {
      opacity: 1,
      duration: 0.8,
      stagger: stagger,
      ease: 'power4.out',
    })

    return () => {
      tl.kill()
    }
  }, [text, stagger, delay, animateOnMount])

  const elementProps = {
    ref: elementRef,
    className: `inline-block ${className}`,
  }

  // @ts-ignore - Dynamic component rendering
  return <Component {...elementProps} />
}
