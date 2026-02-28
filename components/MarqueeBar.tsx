const techs = [
  'Next.js', 'React', 'Node.js', 'TypeScript', 'Tailwind CSS',
  'PostgreSQL', 'Prisma', 'AWS', 'Vercel', 'GSAP', 'Figma', 'Stripe',
]

export default function MarqueeBar() {
  const doubled = [...techs, ...techs]
  return (
    <div className="bg-navy overflow-hidden py-3.5 select-none">
      <div className="flex animate-marquee whitespace-nowrap w-max gap-12">
        {doubled.map((t, i) => (
          <span key={i} className="flex items-center gap-12 text-[13px] tracking-widest font-light text-white/40">
            {t}
            <span className="text-accent text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
