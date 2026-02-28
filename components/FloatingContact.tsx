'use client'
import { useState } from 'react'

export default function FloatingContact() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Mini form */}
      <div
        className={`transition-all duration-300 origin-bottom-right ${
          open
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
        }`}
      >
        <div className="bg-white border border-gray-100 rounded-2xl shadow-2xl shadow-black/10 p-5 w-72">
          <h4 className="font-serif font-light text-[16px] tracking-tight mb-4 text-gray-900">Let&apos;s Talk</h4>
          <input
            type="text"
            placeholder="Your name"
            className="w-full border border-gray-100 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-accent mb-2.5 font-light"
          />
          <input
            type="email"
            placeholder="Email address"
            className="w-full border border-gray-100 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-accent mb-2.5 font-light"
          />
          <textarea
            placeholder="Tell me about your project..."
            rows={3}
            className="w-full border border-gray-100 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-accent mb-3 font-light resize-none"
          />
          <button className="w-full bg-navy text-white text-sm font-medium py-2.5 rounded-xl hover:bg-accent transition-colors duration-200">
            Send Message →
          </button>
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-navy text-white text-sm font-medium px-5 py-3 rounded-full shadow-lg shadow-navy/30 hover:bg-accent transition-all duration-200 hover:scale-105"
      >
        {open ? (
          <>✕ Close</>
        ) : (
          <>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-[pulse2_2s_ease-in-out_infinite]" />
            Let&apos;s Talk
          </>
        )}
      </button>
    </div>
  )
}
