'use client'

const footerLinks = {
  Studio: ['Home', 'About', 'Work', 'Blog'],
  Services: ['Web Dev', 'UI/UX Design', 'SaaS Build', 'Consulting'],
  Connect: ['GitHub', 'LinkedIn', 'Twitter', 'Contact'],
}

export default function Footer() {
  return (
    <footer style={{ background: '#0D1B3E' }} className="px-6 md:px-10 lg:px-14 pt-16 sm:pt-20 pb-8">
      <div className="max-w-6xl mx-auto">

        {/* Top */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-8 mb-12 sm:mb-16">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 font-serif text-lg font-bold text-white mb-4">
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: '#3B5BDB' }} />
              sakhidev
            </div>
            <p className="text-sm font-light leading-relaxed max-w-[220px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
              A freelance dev studio building elegant, fast, and scalable web products for ambitious teams.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([col, items]) => (
            <div key={col}>
              <h5 className="text-xs font-semibold text-white tracking-widest uppercase mb-5">{col}</h5>
              <ul className="flex flex-col gap-3">
                {items.map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm font-light transition-colors duration-200 hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.4)' }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-3" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>© 2025 sakhidev. All rights reserved.</p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Crafted with ✦ precision</p>
        </div>

      </div>
    </footer>
  )
}
