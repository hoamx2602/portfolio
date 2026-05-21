'use client'

import { Shield, Eye, Scale, UserCheck, FileCheck, Lock, AlertTriangle, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useLanguage } from '@/components/language-context'

export function ResponsibleAISection() {
  const { t } = useLanguage()

  const pillars = [
    { icon: Eye,           label: t.responsibleAI.pillars.explainability },
    { icon: Scale,         label: t.responsibleAI.pillars.fairness },
    { icon: FileCheck,     label: t.responsibleAI.pillars.gdpr },
    { icon: Lock,          label: t.responsibleAI.pillars.dataProtection },
    { icon: AlertTriangle, label: t.responsibleAI.pillars.riskManagement },
    { icon: UserCheck,     label: t.responsibleAI.pillars.humanCentred },
    { icon: Shield,        label: t.responsibleAI.pillars.governance },
    { icon: Users,         label: t.responsibleAI.pillars.ethics },
  ]

  const sectors = [
    { name: 'NHS & Healthcare', emoji: '🏥' },
    { name: 'Local Councils',   emoji: '🏛️' },
    { name: 'Universities',     emoji: '🎓' },
    { name: 'Energy & Oil/Gas', emoji: '⚡' },
    { name: 'Financial Services', emoji: '🏦' },
    { name: 'Manufacturing',    emoji: '🏭' },
  ]

  return (
    <section id="responsible-ai" className="py-24 relative overflow-hidden" aria-labelledby="responsible-ai-title">
      {/* Emerald gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 dark:from-emerald-950/30 via-background to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-0 w-[600px] h-[600px] -translate-y-1/2 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.04) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <Shield className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 tracking-widest uppercase">
                {t.responsibleAI.tagline}
              </span>
            </div>

            <h2
              id="responsible-ai-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 text-balance leading-tight bg-gradient-to-br from-foreground to-emerald-600 dark:to-emerald-400 bg-clip-text text-transparent"
            >
              {t.responsibleAI.title}
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-5 text-pretty">
              {t.responsibleAI.description}
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-8 text-pretty">
              {t.responsibleAI.description2}
            </p>

            <Button
              asChild
              size="lg"
              className="gap-2 relative overflow-hidden group text-white hover:text-white"
              style={{
                background: 'linear-gradient(135deg, oklch(0.60 0.14 165), oklch(0.52 0.13 175))',
                boxShadow: '0 0 28px rgba(52,211,153,0.20)',
              }}
            >
              <Link href="#contact">
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/60 border border-border hover:border-emerald-500/30 text-sm text-muted-foreground transition-colors duration-200 cursor-default"
                  >
                    <span aria-hidden="true">{s.emoji}</span>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Pillars grid + callout */}
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3" role="list" aria-label="Responsible AI pillars">
              {pillars.map((pillar, i) => (
                <div
                  key={pillar.label}
                  role="listitem"
                  className="group flex items-start gap-3 p-4 bg-card rounded-xl border border-border hover:border-emerald-500/40 transition-all duration-300 overflow-hidden relative"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: 'radial-gradient(circle at 20% 30%, rgba(52,211,153,0.06) 0%, transparent 70%)' }}
                    aria-hidden="true"
                  />
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(52,211,153,0.10)', border: '1px solid rgba(52,211,153,0.2)' }}
                    aria-hidden="true"
                  >
                    <pillar.icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-sm font-medium text-foreground leading-snug pt-1 relative z-10">
                    {pillar.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Differentiator callout */}
            <div
              className="p-5 rounded-xl border border-emerald-500/25 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(52,211,153,0.06), rgba(16,185,129,0.03))' }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.4), transparent)' }}
                aria-hidden="true"
              />
              <p className="text-sm text-emerald-800 dark:text-emerald-300/90 leading-relaxed">
                <span className="font-semibold text-emerald-700 dark:text-emerald-300">{t.responsibleAI.calloutBold} </span>
                {t.responsibleAI.callout}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
