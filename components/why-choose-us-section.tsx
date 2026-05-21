'use client'

import { Shield, GraduationCap, FlaskConical, Building2 } from 'lucide-react'
import { useLanguage } from '@/components/language-context'

export function WhyChooseUsSection() {
  const { t } = useLanguage()

  const pillars = [
    {
      icon: FlaskConical,
      title: t.whyUs.academic.title,
      description: t.whyUs.academic.description,
      glow: 'rgba(96, 165, 250, 0.12)',
      iconColor: 'text-blue-400',
      iconBg: 'linear-gradient(135deg, rgba(96,165,250,0.15), rgba(34,211,238,0.08))',
      iconBorder: 'rgba(96,165,250,0.25)',
      borderHover: 'hover:border-blue-400/40',
      number: '01',
    },
    {
      icon: Shield,
      title: t.whyUs.responsible.title,
      description: t.whyUs.responsible.description,
      glow: 'rgba(52, 211, 153, 0.12)',
      iconColor: 'text-emerald-400',
      iconBg: 'linear-gradient(135deg, rgba(52,211,153,0.15), rgba(20,184,166,0.08))',
      iconBorder: 'rgba(52,211,153,0.25)',
      borderHover: 'hover:border-emerald-400/40',
      number: '02',
    },
    {
      icon: GraduationCap,
      title: t.whyUs.training.title,
      description: t.whyUs.training.description,
      glow: 'rgba(167, 139, 250, 0.12)',
      iconColor: 'text-violet-400',
      iconBg: 'linear-gradient(135deg, rgba(167,139,250,0.15), rgba(139,92,246,0.08))',
      iconBorder: 'rgba(167,139,250,0.25)',
      borderHover: 'hover:border-violet-400/40',
      number: '03',
    },
    {
      icon: Building2,
      title: t.whyUs.enterprise.title,
      description: t.whyUs.enterprise.description,
      glow: 'rgba(251, 191, 36, 0.10)',
      iconColor: 'text-amber-400',
      iconBg: 'linear-gradient(135deg, rgba(251,191,36,0.15), rgba(245,158,11,0.08))',
      iconBorder: 'rgba(251,191,36,0.25)',
      borderHover: 'hover:border-amber-400/40',
      number: '04',
    },
  ]

  return (
    <section id="why-us" className="py-24 relative overflow-hidden" aria-labelledby="why-us-title">
      <div className="absolute inset-0 bg-secondary/20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary tracking-widest uppercase mb-4 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
            {t.whyUs.tagline}
          </span>
          <h2 id="why-us-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {t.whyUs.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t.whyUs.subtitle}
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" role="list">
          {pillars.map((pillar, i) => (
            <article
              key={pillar.title}
              className={`group relative p-6 bg-card rounded-2xl border border-border ${pillar.borderHover} transition-all duration-500 overflow-hidden flex flex-col`}
              role="listitem"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 30% 20%, ${pillar.glow} 0%, transparent 65%)` }}
                aria-hidden="true"
              />

              {/* Number label */}
              <span className="absolute top-4 right-5 text-4xl font-black text-foreground/5 select-none group-hover:text-foreground/8 transition-colors duration-300">
                {pillar.number}
              </span>

              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 shrink-0`}
                style={{ background: pillar.iconBg, border: `1px solid ${pillar.iconBorder}` }}
                aria-hidden="true"
              >
                <pillar.icon className={`w-6 h-6 ${pillar.iconColor}`} />
              </div>

              <h3 className="text-base font-semibold text-foreground mb-2.5 leading-snug">
                {pillar.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed text-pretty flex-1">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
