export type Project = {
  id: string
  title: string
  category: string
  tags: string[]
  desc: string
  result: string
  year: string
  gradient: string
  label: string
  featured?: boolean
  link?: string
}

export const projects: Project[] = [
  {
    id: 'flowboard',
    title: 'Flowboard',
    category: 'SaaS',
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Prisma'],
    desc: 'A full-featured project management SaaS with real-time collaboration, Stripe billing, role-based access, and a custom analytics dashboard.',
    result: '3x faster team onboarding, 40% reduction in missed deadlines',
    year: '2024',
    gradient: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)',
    label: 'Project Management SaaS',
    featured: true,
  },
  {
    id: 'shoplane',
    title: 'ShopLane',
    category: 'E-Commerce',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    desc: 'Custom storefront with live inventory management, multi-currency support, and seamless payment integrations.',
    result: '2.1s average page load, 28% increase in conversions',
    year: '2024',
    gradient: 'linear-gradient(135deg, #0D1B3E 0%, #1E3A8A 100%)',
    label: 'E-Commerce Platform',
  },
  {
    id: 'novabrand',
    title: 'NovaBrand',
    category: 'Web Design',
    tags: ['Next.js', 'GSAP', 'Framer Motion'],
    desc: 'Award-worthy agency website with cinematic GSAP scroll animations, editorial typography, and a custom CMS.',
    result: 'Awwwards nominee, 65% increase in inbound leads',
    year: '2023',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
    label: 'Agency Website',
  },
  {
    id: 'datalens',
    title: 'DataLens',
    category: 'SaaS',
    tags: ['TypeScript', 'D3.js', 'WebSocket', 'Redis'],
    desc: 'Real-time analytics dashboard with custom D3 chart components, live data streaming, and multi-tenant architecture.',
    result: 'Sub-200ms data latency, 99.9% uptime',
    year: '2023',
    gradient: 'linear-gradient(135deg, #0891B2 0%, #06B6D4 100%)',
    label: 'Analytics Dashboard',
  },
  {
    id: 'healthpulse',
    title: 'HealthPulse',
    category: 'Mobile Web',
    tags: ['Next.js', 'PWA', 'Supabase', 'Tailwind'],
    desc: 'Progressive web app for patient health tracking with offline support, push notifications, and a clean clinical UI.',
    result: '4.8★ user rating, 12k active monthly users',
    year: '2023',
    gradient: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
    label: 'Health Tracking PWA',
  },
  {
    id: 'launchpad',
    title: 'LaunchPad',
    category: 'SaaS',
    tags: ['Next.js', 'OpenAI', 'Stripe', 'Resend'],
    desc: 'AI-powered startup idea validator with market analysis, competitor mapping, and automated investor outreach tools.',
    result: '500+ startups validated in first month',
    year: '2024',
    gradient: 'linear-gradient(135deg, #DC2626 0%, #F97316 100%)',
    label: 'AI SaaS Tool',
  },
  {
    id: 'craftco',
    title: 'CraftCo',
    category: 'E-Commerce',
    tags: ['Next.js', 'Shopify API', 'TypeScript'],
    desc: 'Headless Shopify storefront for an artisan goods brand. Custom product configurator, 3D previews, and AR try-on.',
    result: '180% revenue increase YoY post-launch',
    year: '2022',
    gradient: 'linear-gradient(135deg, #92400E 0%, #D97706 100%)',
    label: 'Headless Commerce',
  },
  {
    id: 'pulse-crm',
    title: 'Pulse CRM',
    category: 'Web Design',
    tags: ['React', 'GraphQL', 'AWS', 'PostgreSQL'],
    desc: 'Internal CRM for a 200-person sales team — pipeline management, email sequencing, and AI-suggested follow-ups.',
    result: '34% improvement in deal close rate',
    year: '2022',
    gradient: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
    label: 'Internal CRM',
  },
]

export const categories = ['All', 'SaaS', 'E-Commerce', 'Web Design', 'Mobile Web']
