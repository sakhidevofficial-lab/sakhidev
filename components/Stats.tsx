'use client'
import { useEffect, useRef, useState } from 'react'

const stats = [
  { num: 47, suffix: '+', label: 'Projects' },
  { num: 98, suffix: '%', label: 'Satisfaction' },
  { num: 5, suffix: 'yr', label: 'Experience' },
  { num: 30, suffix: '+', label: 'Clients' },
]

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const runCounter = () => {
    // Always reset to 0 first
    setCount(0)
    if (timerRef.current) clearInterval(timerRef.current)

    let current = 0
    const duration = 2200   // slower = more satisfying
    const steps = 80
    const increment = target / steps
    const intervalMs = duration / steps

    timerRef.current = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timerRef.current!)
      } else {
        setCount(Math.floor(current))
      }
    }, intervalMs)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            runCounter()
          } else {
            // Reset when out of view so next scroll-in starts from 0
            if (timerRef.current) clearInterval(timerRef.current)
            setCount(0)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => {
      observer.disconnect()
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [target])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section
      style={{ background: '#0D1B3E' }}
      className="pt-10 sm:pt-12 pb-4 sm:pb-6 px-4 sm:px-6 md:px-10 lg:px-14"
    >
      <div className="max-w-5xl mx-auto">
        {/* Bubbles — always one line, no wrapping */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12 lg:gap-16 flex-nowrap">
          {stats.map((s, i) => (
            <div
              key={i}
              className="stat-bubble flex-shrink-0 flex flex-col items-center justify-center cursor-default rounded-full"
              style={{
                width: 'clamp(80px, 18vw, 148px)',
                height: 'clamp(80px, 18vw, 148px)',
                background: '#FAFAFA',
                boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
              }}
            >
              <span
                className="font-serif font-bold leading-none"
                style={{
                  fontSize: 'clamp(16px, 3.5vw, 32px)',
                  color: '#0D1B3E',
                  letterSpacing: '-1px',
                }}
              >
                <Counter target={s.num} suffix={s.suffix} />
              </span>
              <span
                className="font-sans font-light mt-1"
                style={{
                  fontSize: 'clamp(9px, 1.2vw, 13px)',
                  color: '#6B7280',
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}