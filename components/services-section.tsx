'use client'

import { Brain, Factory, Bot, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/components/language-context'
import { useFilter, ServiceCategory } from '@/components/filter-context'

export function ServicesSection() {
  const { t } = useLanguage()
  const { setActiveFilter } = useFilter()

  const services: {
    id: ServiceCategory
    icon: typeof Brain
    title: string
    description: string
    features: string[]
    gradient: string
    glow: string
  }[] = [
    {
      id: 'ai',
      icon: Brain,
      title: t.services.ai.title,
      description: t.services.ai.description,
      features: ['Machine Learning', 'NLP', 'Computer Vision', 'Predictive Analytics'],
      gradient: 'from-[oklch(0.72_0.15_185)]/10 to-transparent',
      glow: 'rgba(100,210,210,0.12)',
    },
    {
      id: 'iiot',
      icon: Factory,
      title: t.services.iiot.title,
      description: t.services.iiot.description,
      features: ['Smart Manufacturing', 'Predictive Maintenance', 'Asset Tracking', 'Real-time Monitoring'],
      gradient: 'from-[oklch(0.65_0.14_220)]/10 to-transparent',
      glow: 'rgba(80,180,220,0.12)',
    },
    {
      id: 'rpa',
      icon: Bot,
      title: t.services.rpa.title,
      description: t.services.rpa.description,
      features: ['Workflow Automation', 'Process Optimization', 'Intelligent Bots', 'Integration Services'],
      gradient: 'from-[oklch(0.70_0.13_195)]/10 to-transparent',
      glow: 'rgba(90,195,205,0.12)',
    },
  ]

  const handleLearnMore = (category: ServiceCategory) => {
    setActiveFilter(category)
    const trainingSection = document.getElementById('training')
    if (trainingSection) {
      trainingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="services" className="py-24 relative overflow-hidden" aria-labelledby="services-title">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(100,210,210,0.03) 0%, transparent 70%)' }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary tracking-widest uppercase mb-4 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
            What We Do
          </span>
          <h2 id="services-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {t.services.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t.services.subtitle}
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6" role="list">
          {services.map((service, i) => (
            <article
              key={service.title}
              className="group relative p-8 bg-card rounded-2xl border border-border hover:border-primary/40 transition-all duration-500 overflow-hidden flex flex-col"
              role="listitem"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {/* Top gradient wash on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 30% 20%, ${service.glow} 0%, transparent 60%)` }}
                aria-hidden="true"
              />

              {/* Shimmer line on top */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                style={{ background: 'linear-gradient(135deg, rgba(100,210,210,0.15), rgba(100,210,210,0.05))', border: '1px solid rgba(100,210,210,0.2)' }}
                aria-hidden="true"
              >
                <service.icon className="w-7 h-7 text-primary" />
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>

              <p className="text-muted-foreground mb-6 leading-relaxed text-pretty text-sm flex-1">
                {service.description}
              </p>

              <ul className="space-y-2 mb-8" aria-label={`${service.title} features`}>
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleLearnMore(service.id)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-200 group/btn mt-auto"
                aria-label={`Learn more about ${service.title}`}
              >
                {t.services.learnMore || 'Learn more'}
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 duration-200" aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
