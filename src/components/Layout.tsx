import { HelmetProvider } from 'react-helmet-async'
import { CustomCursor, GrainOverlay, Preloader } from '@components/ui'
import { useLenis } from '@hooks/useLenis'
import { useState, useEffect } from 'react'
import '../styles/globals.css'

interface LayoutProps {
  children: React.ReactNode
}

/**
 * Main layout wrapper component
 * - Provides Helmet context for SEO
 * - Initializes Lenis smooth scroll
 * - Renders custom cursor and grain overlay
 * - Manages preloader state
 */
export function Layout({ children }: LayoutProps) {
  const [isLoading, setIsLoading] = useState(true)
  const { isReady } = useLenis()

  // Hide overflow during preloader
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isLoading])

  const handlePreloaderComplete = () => {
    setIsLoading(false)
  }

  return (
    <HelmetProvider>
      <div data-lenis-scroll-wrapper className="relative min-h-screen">
        {/* Preloader */}
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

        {/* Grain overlay for texture */}
        <GrainOverlay opacity={0.03} />

        {/* Custom cursor (auto-hides on mobile/touch) */}
        <CustomCursor enabled={!isLoading} />

        {/* Main content */}
        <main className="relative z-10">{children}</main>
      </div>
    </HelmetProvider>
  )
}
