'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/components/language-context'

function useCountUp(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start: number | null = null
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])
  return count
}

function StatCard({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  // Parse numeric value from string like "200+" or "25+"
  const numeric = parseInt(value.replace(/\D/g, ''), 10)
  const suffix = value.replace(/\d/g, '')
  const count = useCountUp(numeric, 1800 + index * 100, visible)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="relative p-6 bg-card rounded-xl border border-border hover:border-primary/40 transition-all duration-500 group overflow-hidden"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(100,210,210,0.06) 0%, transparent 70%)' }} />
      <dd className="text-3xl sm:text-4xl font-bold text-primary mb-1 tabular-nums">
        {visible ? `${count}${suffix}` : value}
      </dd>
      <dt className="text-sm text-muted-foreground font-medium">{label}</dt>
    </div>
  )
}

export function AboutSection() {
  const { t } = useLanguage()

  const stats = [
    { value: '200+', label: t.about.stats.clients },
    { value: '500+', label: t.about.stats.projects },
    { value: '25+', label: t.about.stats.countries },
    { value: '50+', label: t.about.stats.experts },
  ]

  return (
    <section id="about" className="py-24 relative overflow-hidden" aria-labelledby="about-title">
      {/* Subtle section bg */}
      <div className="absolute inset-0 bg-secondary/20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text column */}
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary tracking-widest uppercase mb-4 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
              {t.about.subtitle}
            </span>
            <h2 id="about-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance leading-tight">
              {t.about.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 text-pretty">
              {t.about.description}
            </p>

            <dl className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <StatCard key={stat.label} value={stat.value} label={stat.label} index={i} />
              ))}
            </dl>
          </div>

          {/* Visual column */}
          <div className="relative flex items-center justify-center" aria-hidden="true">
            {/* Outer glow ring */}
            <div className="absolute w-[420px] h-[420px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(100,210,210,0.08) 0%, transparent 70%)' }} />

            {/* Concentric orbit rings */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80">
              {/* Ring 1 */}
              <div className="absolute inset-0 rounded-full border border-primary/15 animate-spin"
                style={{ animationDuration: '30s' }}>
                {/* Orbit dot */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary/60 rounded-full shadow-[0_0_8px_rgba(100,210,210,0.8)]" />
              </div>
              {/* Ring 2 */}
              <div className="absolute inset-6 rounded-full border border-primary/20 animate-spin"
                style={{ animationDuration: '20s', animationDirection: 'reverse' }}>
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-primary/70 rounded-full shadow-[0_0_6px_rgba(100,210,210,0.8)]" />
              </div>
              {/* Ring 3 */}
              <div className="absolute inset-12 rounded-full border border-primary/30 animate-spin"
                style={{ animationDuration: '12s' }}>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary/80 rounded-full shadow-[0_0_5px_rgba(100,210,210,0.9)]" />
              </div>
              {/* Center core */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center animate-pulse"
                  style={{ animationDuration: '3s' }}>
                  <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-primary/70 shadow-[0_0_20px_rgba(100,210,210,0.6)]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating data nodes */}
            {[
              { label: 'AI', top: '8%', left: '12%' },
              { label: 'IoT', top: '8%', right: '12%' },
              { label: 'RPA', bottom: '8%', left: '12%' },
              { label: 'XAI', bottom: '8%', right: '12%' },
            ].map((node, i) => (
              <div
                key={node.label}
                className="absolute px-3 py-1.5 text-xs font-bold text-primary bg-primary/10 border border-primary/25 rounded-full backdrop-blur-sm animate-pulse"
                style={{
                  top: node.top,
                  left: node.left,
                  right: node.right,
                  bottom: node.bottom,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: '4s',
                }}
              >
                {node.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
