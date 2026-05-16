'use client'

import { useLanguage } from '@/components/language-context'
import { Quote } from 'lucide-react'

const clients = [
  { name: 'TechCorp Industries', logo: 'TC' },
  { name: 'Global Manufacturing', logo: 'GM' },
  { name: 'FinServe Solutions', logo: 'FS' },
  { name: 'HealthCare Plus', logo: 'HC' },
  { name: 'AutoMotive Leaders', logo: 'AL' },
  { name: 'Energy Dynamics', logo: 'ED' },
  { name: 'Retail Networks', logo: 'RN' },
  { name: 'Logistics Pro', logo: 'LP' },
]

const testimonials = [
  {
    quote: 'Their AI solution transformed our customer service operations. We saw immediate ROI within the first quarter of implementation.',
    author: 'Jennifer Martinez',
    role: 'VP of Operations',
    company: 'FinServe Solutions',
    initials: 'JM',
  },
  {
    quote: 'The IIoT implementation exceeded our expectations. Production efficiency increased by 40% and maintenance costs dropped significantly.',
    author: 'Robert Chang',
    role: 'Plant Director',
    company: 'Global Manufacturing',
    initials: 'RC',
  },
  {
    quote: 'Outstanding training programs. Our team gained practical skills they could apply immediately. Highly recommend their RPA courses.',
    author: 'Lisa Anderson',
    role: 'IT Director',
    company: 'HealthCare Plus',
    initials: 'LA',
  },
]

export function ClientsSection() {
  const { t } = useLanguage()

  return (
    <section id="clients" className="py-24" aria-labelledby="clients-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <header className="text-center mb-16">
          <h2 id="clients-title" className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            {t.clients?.title || 'Trusted by Industry Leaders'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t.clients?.subtitle || 'We partner with forward-thinking organizations across diverse industries'}
          </p>
        </header>

        {/* Client Logos */}
        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-20" aria-label="Our clients">
          {clients.map((client) => (
            <li
              key={client.name}
              className="bg-card rounded-xl border border-border p-6 flex items-center justify-center hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                  <span className="text-sm font-bold text-primary">{client.logo}</span>
                </div>
                <span className="text-sm font-medium text-muted-foreground hidden sm:block">
                  {client.name}
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            {t.clients?.testimonials || 'What Our Clients Say'}
          </h3>
        </div>

        <div className="grid lg:grid-cols-3 gap-8" role="list" aria-label="Client testimonials">
          {testimonials.map((testimonial, index) => (
            <blockquote
              key={index}
              className="bg-card rounded-2xl border border-border p-6 hover:border-primary/50 transition-colors"
              role="listitem"
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" aria-hidden="true" />
              
              <p className="text-muted-foreground leading-relaxed mb-6 text-pretty">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              
              <footer className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center" aria-hidden="true">
                  <span className="text-sm font-bold text-primary">{testimonial.initials}</span>
                </div>
                <div>
                  <cite className="font-medium text-foreground not-italic">{testimonial.author}</cite>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Stats */}
        <dl className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: '200+', label: t.clients?.stats?.clients || 'Clients Worldwide' },
            { value: '500+', label: t.clients?.stats?.projects || 'Projects Delivered' },
            { value: '98%', label: t.clients?.stats?.satisfaction || 'Client Satisfaction' },
            { value: '15+', label: t.clients?.stats?.countries || 'Countries Served' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-4xl font-bold text-primary mb-2">{stat.value}</dd>
              <dt className="text-sm text-muted-foreground">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
