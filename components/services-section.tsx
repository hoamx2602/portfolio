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
  }[] = [
    {
      id: 'ai',
      icon: Brain,
      title: t.services.ai.title,
      description: t.services.ai.description,
      features: ['Machine Learning', 'NLP', 'Computer Vision', 'Predictive Analytics'],
    },
    {
      id: 'iiot',
      icon: Factory,
      title: t.services.iiot.title,
      description: t.services.iiot.description,
      features: ['Smart Manufacturing', 'Predictive Maintenance', 'Asset Tracking', 'Real-time Monitoring'],
    },
    {
      id: 'rpa',
      icon: Bot,
      title: t.services.rpa.title,
      description: t.services.rpa.description,
      features: ['Workflow Automation', 'Process Optimization', 'Intelligent Bots', 'Integration Services'],
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
    <section id="services" className="py-24" aria-labelledby="services-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 id="services-title" className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            {t.services.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t.services.subtitle}
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8" role="list">
          {services.map((service) => (
            <article
              key={service.title}
              className="group relative p-8 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-300"
              role="listitem"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors" aria-hidden="true">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed text-pretty">
                {service.description}
              </p>

              <ul className="space-y-2 mb-6" aria-label={`${service.title} features`}>
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleLearnMore(service.id)}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
                aria-label={`Learn more about ${service.title}`}
              >
                {t.services.learnMore || 'Learn more'}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
