export type Post = {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  featured?: boolean
  gradient: string
}

export const posts: Post[] = [
  {
    id: 'app-router-workflow',
    title: 'Why Next.js App Router Changed Everything for My Workflow',
    excerpt: 'After 6 months building exclusively with Next.js 14 App Router, here\'s what I\'ve learned about structuring complex applications, handling layouts, and where it genuinely shines.',
    category: 'Next.js',
    date: 'Feb 12, 2025',
    readTime: '8 min read',
    featured: true,
    gradient: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)',
  },
  {
    id: 'gsap-scroll-animations',
    title: 'Cinematic Web Animations Without Killing Performance',
    excerpt: 'A practical guide to GSAP ScrollTrigger patterns that look incredible without tanking your Lighthouse score. Real code, real benchmarks.',
    category: 'GSAP',
    date: 'Jan 28, 2025',
    readTime: '6 min read',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
  },
  {
    id: 'design-system',
    title: 'The Light & Minimal Design System I Use on Every Project',
    excerpt: 'From color tokens to typography scales — a reusable Figma + Tailwind system I\'ve refined over 47+ projects that ships fast and looks great.',
    category: 'Design',
    date: 'Jan 10, 2025',
    readTime: '5 min read',
    gradient: 'linear-gradient(135deg, #0891B2 0%, #06B6D4 100%)',
  },
  {
    id: 'saas-auth-patterns',
    title: 'The Auth Patterns I Reach for in Every SaaS Build',
    excerpt: 'Magic links, OAuth, session management, and SSO — here\'s how I think about authentication architecture when building multi-tenant SaaS products.',
    category: 'SaaS',
    date: 'Dec 22, 2024',
    readTime: '10 min read',
    gradient: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
  },
  {
    id: 'prisma-postgresql',
    title: 'Prisma + PostgreSQL: The Setup I Wish I Had From Day One',
    excerpt: 'Schema design, migrations, relations, and the performance gotchas nobody warns you about. A senior engineer\'s guide to using Prisma in production.',
    category: 'Backend',
    date: 'Dec 5, 2024',
    readTime: '12 min read',
    gradient: 'linear-gradient(135deg, #DC2626 0%, #F97316 100%)',
  },
  {
    id: 'freelance-pricing',
    title: 'How I Price Freelance Projects (And Why I Stopped Hourly)',
    excerpt: 'After years of hourly billing, I switched to value-based pricing. Here\'s the exact framework I use to scope, price, and present projects to clients.',
    category: 'Business',
    date: 'Nov 18, 2024',
    readTime: '7 min read',
    gradient: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
  },
  {
    id: 'typescript-tricks',
    title: '10 TypeScript Patterns That Made My Codebase 10x Cleaner',
    excerpt: 'Discriminated unions, template literal types, conditional types — the advanced TypeScript patterns I actually use day to day and why they matter.',
    category: 'TypeScript',
    date: 'Nov 2, 2024',
    readTime: '9 min read',
    gradient: 'linear-gradient(135deg, #0D1B3E 0%, #1E3A8A 100%)',
  },
  {
    id: 'client-communication',
    title: 'How I Communicate With Clients So Projects Never Go Off Track',
    excerpt: 'The exact async update system, Loom video cadence, and check-in structure I use to keep every project on time and clients happy.',
    category: 'Business',
    date: 'Oct 14, 2024',
    readTime: '6 min read',
    gradient: 'linear-gradient(135deg, #92400E 0%, #D97706 100%)',
  },
]

export const categories = ['All', 'Next.js', 'GSAP', 'Design', 'SaaS', 'Backend', 'TypeScript', 'Business']
