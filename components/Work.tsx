'use client'
import { useReveal } from './useReveal'

const projects = [
  {
    title: 'Flowboard — Project Management SaaS',
    desc: 'Full-featured SaaS with real-time collaboration, Stripe billing, and a custom dashboard.',
    tags: ['Next.js', 'Stripe', 'SaaS'],
    grad: 'from-blue-600 to-indigo-600',
    label: '✦ Featured Project',
    featured: true,
  },
  {
    title: 'ShopLane — E-Commerce Platform',
    desc: 'Custom storefront with inventory management and payment integrations.',
    tags: ['React', 'Node.js'],
    grad: 'from-navy-DEFAULT to-blue-900',
    label: 'E-Commerce',
    featured: false,
  },
  {
    title: 'NovaBrand — Agency Site',
    desc: 'Award-worthy agency website with cinematic GSAP animations and editorial design.',
    tags: ['Framer', 'Design', 'GSAP'],
    grad: 'from-violet-600 to-purple-500',
    label: 'Brand & Design',
    featured: false,
  },
  {
    title: 'DataLens — Analytics Tool',
    desc: 'Real-time analytics dashboard with custom chart components and live data streaming.',
    tags: ['TypeScript', 'D3.js'],
    grad: 'from-cyan-600 to-teal-500',
    label: 'Analytics Dashboard',
    featured: false,
  },
]

const gradMap: Record<string, string> = {
  'from-blue-600 to-indigo-600': 'linear-gradient(135deg, #2563EB, #4F46E5)',
  'from-navy-DEFAULT to-blue-900': 'linear-gradient(135deg, #0D1B3E, #1E3A8A)',
  'from-violet-600 to-purple-500': 'linear-gradient(135deg, #7C3AED, #A855F7)',
  'from-cyan-600 to-teal-500': 'linear-gradient(135deg, #0891B2, #14B8A6)',
}

export default function Work() {
  const ref = useReveal()

  return (
    <section ref={ref} className="py-20 sm:py-28 px-6 md:px-10 lg:px-14" style={{background:'#F8F9FF'}}>
      <div className="max-w-6xl mx-auto">

        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">Selected Work</p>
            <h2 className="font-serif font-light leading-tight" style={{fontSize:'clamp(28px,3.5vw,52px)',letterSpacing:'-1px',color:'#111827'}}>
              Projects That<br /><em className="not-italic" style={{color:'#3B5BDB'}}>Define</em> Our Craft
            </h2>
          </div>
          <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 border-b border-gray-200 pb-0.5 text-link-arrow whitespace-nowrap">
            All projects <span>↗</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <div
              key={i}
              className={`work-card rounded-2xl overflow-hidden border border-gray-200 bg-white cursor-pointer ${p.featured ? 'md:col-span-2' : ''}`}
            >
              {/* Thumb */}
              <div className={`overflow-hidden ${p.featured ? 'h-52 sm:h-72 md:h-80' : 'h-44 sm:h-56'}`}>
                <div
                  className="work-card-img w-full h-full flex items-center justify-center font-serif text-white font-light"
                  style={{background: gradMap[p.grad], fontSize:'clamp(14px,2vw,18px)'}}
                >
                  {p.label}
                </div>
              </div>

              {/* Info */}
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap gap-2 mb-3">
                  {p.tags.map(t => (
                    <span key={t} className="text-xs font-medium px-3 py-1 rounded-full" style={{background:'#EEF2FF',color:'#3B5BDB',border:'1px solid #C7D2FE'}}>
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="font-serif font-light text-xl sm:text-2xl leading-snug mb-2" style={{letterSpacing:'-0.5px',color:'#111827'}}>
                  {p.title}
                </h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
