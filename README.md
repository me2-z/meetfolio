# Meet Zanzmera - Developer Portfolio

A production-ready, high-performance 3D animated developer portfolio built with React 18, Vite, TypeScript, Tailwind CSS, GSAP, and Three.js.

## Tech Stack

- **Framework:** React 18 + Vite + TypeScript
- **Styling:** Tailwind CSS v3 with custom design tokens
- **Animation:** GSAP 3 + ScrollTrigger + Lenis (smooth scroll)
- **3D:** Three.js via @react-three/fiber + @react-three/drei + @react-three/postprocessing
- **UI Micro-interactions:** Framer Motion
- **SEO:** react-helmet-async
- **Deploy Target:** Vercel

## Project Structure

```
src/
├── components/
│   ├── sections/     # Page section components (Hero, About, Projects, etc.)
│   ├── ui/           # Reusable UI components (buttons, text, effects)
│   ├── three/        # Three.js/R3F components
│   └── Layout.tsx    # Main layout wrapper
├── hooks/            # Custom React hooks (GSAP, Lenis, device detection)
├── data/             # All content data (siteConfig, projects, skills)
├── styles/           # Global CSS and design tokens
├── utils/            # Utility functions
├── App.tsx           # Main app component
└── main.tsx          # Entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Configuration

#### Updating Content

All site content lives in `src/data/siteConfig.ts`. Edit this file to update:

- Personal information (name, email, phone, location)
- Social links (LinkedIn, GitHub)
- Profile/about text
- Education details
- Skills categories
- Projects array
- SEO section content
- Contact form settings

#### Adding New Projects

Edit the `projects` array in `src/data/siteConfig.ts`:

```typescript
export const projects: Project[] = [
  {
    id: 'your-project-id',
    title: 'Project Name',
    category: 'Category',
    description: 'Description text',
    features: ['Feature 1', 'Feature 2'],
    tags: ['React', 'TypeScript', 'Tailwind'],
    githubUrl: 'https://github.com/...',
    liveUrl: 'https://...',
    isPlaceholder: false,
  },
  // ...more projects
]
```

#### Contact Form

The contact form uses Formspree by default. Update the form action URL in `src/data/siteConfig.ts`:

```typescript
formAction: 'https://formspree.io/f/YOUR_FORM_ID'
```

## Design Tokens

Custom design tokens are defined in `tailwind.config.js` and `src/styles/globals.css`:

- **Colors:** Background (#0A0A0B), Foreground (#EDEDED), Accent Cyan (#6EE7FF), Accent Lime (#C6FF3E)
- **Fonts:** Clash Display (display), Inter (body)
- **Spacing:** Fluid spacing with clamp() for responsive typography

## Performance Optimizations

- DPR capped at 1.75 for 3D canvas
- Lazy-loaded Three.js canvas with React.lazy + Suspense
- Render loop paused when tab is hidden (`frameloop="demand"`)
- Only transform and opacity animations (GPU-accelerated)
- Reduced motion support via `prefers-reduced-motion` media query
- Code splitting with manual chunks for vendor libraries

## Accessibility

- Semantic HTML5 landmarks
- Keyboard navigable
- Visible focus rings
- ARIA labels on icon buttons
- Color contrast AA compliant
- Canvas marked `aria-hidden`
- Screen reader friendly

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Mobile devices use lightweight CSS/SVG fallbacks for heavy 3D animations.

## Deployment (Vercel)

1. Push code to GitHub repository
2. Import project in Vercel
3. Deploy with default settings

Build command: `npm run build`
Output directory: `dist`

## Development Phases

This portfolio is built in phases:

- **Phase 1:** Project setup, tokens, layout shell, smooth scroll, custom cursor, preloader ✅
- **Phase 2:** Hero + 3D canvas + kinetic type
- **Phase 3:** About, Marquee, Skills 3D
- **Phase 4:** Projects horizontal scroll + case-study overlay
- **Phase 5:** SEO/GEO section, Timeline, Contact, Footer
- **Phase 6:** SEO meta + schema, a11y pass, performance optimization, reduced-motion

## License

MIT © Meet Zanzmera
