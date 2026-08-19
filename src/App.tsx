import { Layout } from '@components/Layout'

/**
 * Main App component for Phase 1
 * Contains layout shell with preloader, smooth scroll, and custom cursor
 * 
 * Phase 1 Features:
 * - Project setup complete (Vite + React 18 + TypeScript)
 * - Tailwind CSS configured with custom design tokens
 * - Lenis smooth scroll initialized
 * - Custom cursor with hover states
 * - Preloader with counter animation and curtain reveal
 * - Grain overlay for texture
 * - Responsive and accessible foundation
 */
function App() {
  return (
    <Layout>
      {/* Placeholder content for testing Phase 1 */}
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-display-xl font-display font-bold mb-4">
            Meet Zanzmera
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Front-End Developer • AI-Assisted Development • SEO & GEO
          </p>
          <p className="mt-8 text-sm text-muted-foreground">
            Scroll down to explore the portfolio
          </p>
        </div>
      </section>

      {/* Spacer sections to enable scrolling */}
      <section className="h-screen bg-surface" />
      <section className="h-screen bg-background" />
      <section className="h-screen bg-surface" />
    </Layout>
  )
}

export default App
