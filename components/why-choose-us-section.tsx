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
      accent: 'from-blue-500/20 to-cyan-500/20',
      border: 'hover:border-blue-500/40',
    },
    {
      icon: Shield,
      title: t.whyUs.responsible.title,
      description: t.whyUs.responsible.description,
      accent: 'from-emerald-500/20 to-teal-500/20',
      border: 'hover:border-emerald-500/40',
    },
    {
      icon: GraduationCap,
      title: t.whyUs.training.title,
      description: t.whyUs.training.description,
      accent: 'from-violet-500/20 to-purple-500/20',
      border: 'hover:border-violet-500/40',
    },
    {
      icon: Building2,
      title: t.whyUs.enterprise.title,
      description: t.whyUs.enterprise.description,
      accent: 'from-amber-500/20 to-orange-500/20',
      border: 'hover:border-amber-500/40',
    },
  ]

  return (
    <section id="why-us" className="py-24 bg-secondary/20" aria-labelledby="why-us-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <span className="text-sm font-medium text-primary tracking-wider uppercase mb-4 block">
            {t.whyUs.tagline}
          </span>
          <h2 id="why-us-title" className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            {t.whyUs.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t.whyUs.subtitle}
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className={`group relative p-6 bg-card rounded-2xl border border-border ${pillar.border} transition-all duration-300`}
              role="listitem"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.accent} flex items-center justify-center mb-5 transition-transform group-hover:scale-110`} aria-hidden="true">
                <pillar.icon className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2 leading-snug">
                {pillar.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
