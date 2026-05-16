'use client'

import { useLanguage } from '@/components/language-context'

export function AboutSection() {
  const { t } = useLanguage()

  const stats = [
    { value: '200+', label: t.about.stats.clients },
    { value: '500+', label: t.about.stats.projects },
    { value: '25+', label: t.about.stats.countries },
    { value: '50+', label: t.about.stats.experts },
  ]

  return (
    <section id="about" className="py-24 bg-secondary/30" aria-labelledby="about-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-medium text-primary tracking-wider uppercase mb-4 block">
              {t.about.subtitle}
            </span>
            <h2 id="about-title" className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
              {t.about.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-pretty">
              {t.about.description}
            </p>
            
            <dl className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="p-4 bg-card rounded-lg border border-border">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-3xl font-bold text-primary mb-1">{stat.value}</dd>
                  <dt className="text-sm text-muted-foreground">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative" aria-hidden="true">
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary rounded-2xl flex items-center justify-center overflow-hidden">
              {/* Abstract tech visualization */}
              <div className="relative w-full h-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-primary/30 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
                  <div className="absolute w-36 h-36 border-2 border-primary/40 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                  <div className="absolute w-24 h-24 border-2 border-primary/50 rounded-full animate-spin" style={{ animationDuration: '10s' }} />
                  <div className="absolute w-12 h-12 bg-primary rounded-full animate-pulse" />
                </div>
                
                {/* Floating dots */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-primary/60 rounded-full animate-pulse"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${20 + Math.random() * 60}%`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
