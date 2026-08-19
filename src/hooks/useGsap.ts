import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Custom hook for managing GSAP contexts with proper cleanup
 * Ensures all GSAP animations are reverted on unmount
 */
export function useGsapContext(callback: (context: gsap.Context) => void, dependencies: any[] = []) {
  const contextRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      callback(ctx)
    })

    contextRef.current = ctx

    return () => {
      ctx.revert()
    }
  }, dependencies)

  return contextRef
}

/**
 * Hook to create split text animation (free alternative to GSAP SplitText plugin)
 */
export function useSplitText(
  ref: React.RefObject<HTMLElement>,
  options: {
    type?: 'chars' | 'words' | 'lines'
    stagger?: number | gsap.StaggerConfig
    from?: 'start' | 'end' | 'center' | 'random'
    animate?: boolean
  } = {}
) {
  const { type = 'chars', stagger = 0.02, from = 'start', animate = true } = options
  const splitRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    const element = ref.current
    if (!element || !animate) return

    const text = element.textContent || ''
    element.textContent = ''
    splitRef.current = []

    if (type === 'chars') {
      [...text].forEach((char) => {
        const span = document.createElement('span')
        span.textContent = char === ' ' ? '\u00A0' : char
        span.style.display = 'inline-block'
        span.style.opacity = '0'
        element.appendChild(span)
        splitRef.current.push(span)
      })
    } else if (type === 'words') {
      text.split(' ').forEach((word) => {
        const span = document.createElement('span')
        span.textContent = word
        span.style.display = 'inline-block'
        span.style.marginRight = '0.25em'
        span.style.opacity = '0'
        element.appendChild(span)
        splitRef.current.push(span)
      })
    }

    gsap.to(splitRef.current, {
      opacity: 1,
      duration: 0.8,
      stagger: typeof stagger === 'number' ? stagger : 0.02,
      ease: 'power4.out',
    })

    return () => {
      gsap.killTweensOf(splitRef.current)
    }
  }, [ref, type, stagger, from, animate])

  return splitRef
}
