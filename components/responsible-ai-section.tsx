'use client'

import { Shield, Eye, Scale, UserCheck, FileCheck, Lock, AlertTriangle, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useLanguage } from '@/components/language-context'

export function ResponsibleAISection() {
  const { t } = useLanguage()

  const pillars = [
    { icon: Eye, label: t.responsibleAI.pillars.explainability },
    { icon: Scale, label: t.responsibleAI.pillars.fairness },
    { icon: FileCheck, label: t.responsibleAI.pillars.gdpr },
    { icon: Lock, label: t.responsibleAI.pillars.dataProtection },
    { icon: AlertTriangle, label: t.responsibleAI.pillars.riskManagement },
    { icon: UserCheck, label: t.responsibleAI.pillars.humanCentred },
    { icon: Shield, label: t.responsibleAI.pillars.governance },
    { icon: Users, label: t.responsibleAI.pillars.ethics },
  ]

  const sectors = [
    { name: 'NHS & Healthcare', emoji: '🏥' },
    { name: 'Local Councils', emoji: '🏛️' },
    { name: 'Universities', emoji: '🎓' },
    { name: 'Energy & Oil/Gas', emoji: '⚡' },
    { name: 'Financial Services', emoji: '🏦' },
    { name: 'Manufacturing', emoji: '🏭' },
  ]

  return (
    <section id="responsible-ai" className="py-24 relative overflow-hidden" aria-labelledby="responsible-ai-title">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-background to-background" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <Shield className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
              <span className="text-xs font-medium text-emerald-400 tracking-wider uppercase">
                {t.responsibleAI.tagline}
              </span>
            </div>

            <h2 id="responsible-ai-title" className="text-3xl sm:text-4xl font-bold text-foreground mb-5 text-balance">
              {t.responsibleAI.title}
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6 text-pretty">
              {t.responsibleAI.description}
            </p>

            <p className="text-base text-muted-foreground leading-relaxed mb-8 text-pretty">
              {t.responsibleAI.description2}
            </p>

            <Button asChild size="lg" className="gap-2 bg-emerald-600 hover:bg-emerald-500 text-white border-0">
              <Link href="#contact">
                {t.responsibleAI.cta}
                <Shield className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>

            {/* Regulated sectors */}
            <div className="mt-10">
              <p className="text-sm font-medium text-muted-foreground mb-4">{t.responsibleAI.sectorsLabel}</p>
              <div className="flex flex-wrap gap-2">
                {sectors.map((s) => (
                  <span
                    key={s.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/60 border border-border text-sm text-muted-foreground"
                  >
                    <span aria-hidden="true">{s.emoji}</span>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Pillars grid */}
          <div>
            <div className="grid grid-cols-2 gap-4" role="list" aria-label="Responsible AI pillars">
              {pillars.map((pillar) => (
                <div
                  key={pillar.label}
                  role="listitem"
                  className="group flex items-start gap-3 p-4 bg-card rounded-xl border border-border hover:border-emerald-500/40 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors" aria-hidden="true">
                    <pillar.icon className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-sm font-medium text-foreground leading-snug pt-1">
                    {pillar.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Differentiator callout */}
            <div className="mt-6 p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-sm text-emerald-300/90 leading-relaxed">
                <span className="font-semibold text-emerald-300">{t.responsibleAI.calloutBold} </span>
                {t.responsibleAI.callout}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
