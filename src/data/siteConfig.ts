/**
 * Site configuration and content data
 * All strings live here - no hardcoded text in components
 */

export const siteConfig = {
  name: 'Meet Zanzmera',
  role: 'Front-End Developer • AI-Assisted Development • SEO & GEO',
  location: 'Surat, Gujarat, India',
  email: 'meetzanzmera15@gmail.com',
  phone: '8866068069',
  socials: {
    linkedin: 'https://linkedin.com/in/meet-zanzmera',
    github: 'https://github.com/meetzanzmera',
  },
  availability: 'Available for work',
}

export const profile = {
  about: `I'm a front-end developer who builds complete websites using AI-assisted development
tools — from first idea to a finished, responsive site. Alongside development I focus on
SEO and GEO (Generative Engine Optimization), using Google Search Console, Google
Analytics and Ahrefs, so what I build actually gets found. I'm always learning new tools
and taking on real projects.`,
  status: `Currently open to front-end developer roles. Outside formal work I build and ship
complete projects solo — design, build, deploy — and I bring that same ownership to a team.`,
}

export const education = {
  degree: 'Bachelor of Computer Applications (BCA)',
  period: '2024 – 2027',
  institution: 'Gujarat University',
}

export const skills = {
  categories: [
    {
      name: 'Languages',
      items: ['HTML', 'CSS', 'JavaScript'],
    },
    {
      name: 'Frameworks & Libraries',
      items: ['React.js', 'Tailwind CSS'],
    },
    {
      name: 'Tools',
      items: ['Git', 'GitHub', 'Vercel'],
    },
    {
      name: 'SEO & Analytics',
      items: ['Google Search Console', 'Google Analytics', 'Ahrefs', 'SEO', 'GEO'],
    },
    {
      name: 'Other',
      items: ['Responsive Design', 'API Integration', 'AI-Assisted Development'],
    },
  ],
  allSkills: [
    'HTML', 'CSS', 'JavaScript', 'React.js', 'Tailwind CSS', 'Git', 'GitHub', 
    'Vercel', 'Google Search Console', 'Google Analytics', 'Ahrefs', 'SEO', 
    'GEO', 'Responsive Design', 'API Integration', 'AI-Assisted Development'
  ],
}

export interface Project {
  id: string
  title: string
  category: string
  description: string
  features: string[]
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  isPlaceholder?: boolean
  image?: string
}

export const projects: Project[] = [
  {
    id: 'realruler',
    title: 'RealRuler',
    category: 'Front-End Development',
    description: 'Online ruler & measurement tool that lets people measure real objects directly on their screen',
    features: [
      'Simple, distraction-free UI that works smoothly on desktop and mobile',
      'Handled design, layout and deployment end-to-end, from v1 to live site',
      'Accurate pixel-to-real-world conversion',
    ],
    tags: ['React', 'JavaScript', 'CSS', 'Responsive', 'Vercel'],
    githubUrl: 'https://github.com/meetzanzmera/realruler',
    liveUrl: 'https://realruler.vercel.app',
    isPlaceholder: false,
  },
  {
    id: 'coming-soon-1',
    title: 'Project Alpha',
    category: 'Coming Soon',
    description: 'A new experimental project in development',
    features: [],
    tags: [],
    isPlaceholder: true,
  },
  {
    id: 'coming-soon-2',
    title: 'Project Beta',
    category: 'Coming Soon',
    description: 'Another exciting project coming soon',
    features: [],
    tags: [],
    isPlaceholder: true,
  },
]

export const seoSection = {
  headline: "I don't just build sites. I make sure Google — and AI answer engines — find them.",
  stats: [
    { label: 'Search Rankings Improved', value: '#9 → #1', suffix: '' },
    { label: 'Organic Traffic Growth', value: '+', suffix: '%', target: 150 },
    { label: 'Core Web Vitals', value: '90+', suffix: '/100', target: 95 },
  ],
  tools: ['Google Search Console', 'Google Analytics', 'Ahrefs'],
}

export const contact = {
  heading: "LET'S BUILD",
  subheading: 'Have a project in mind? Let\'s create something amazing together.',
  formAction: 'https://formspree.io/f/your-form-id', // Replace with actual Formspree ID
  fields: [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'message', label: 'Message', type: 'textarea', required: true },
  ],
}

export const footer = {
  timezone: 'Asia/Kolkata', // IST
  backToTop: 'Back to Top',
}
