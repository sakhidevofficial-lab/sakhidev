'use client'
import { categories } from './projects'

interface Props {
  active: string
  onChange: (cat: string) => void
}

export default function WorkFilter({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-center py-10">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className="text-xs sm:text-sm font-medium rounded-full px-4 sm:px-5 py-2 sm:py-2.5 transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            background: active === cat ? '#0D1B3E' : '#F3F4F6',
            color:      active === cat ? '#fff'    : '#6B7280',
            border:     active === cat ? '1px solid transparent' : '1px solid #E5E7EB',
            boxShadow:  active === cat ? '0 4px 14px rgba(13,27,62,0.2)' : 'none',
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
