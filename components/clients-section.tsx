'use client'

import { useLanguage } from '@/components/language-context'
import { Quote, Star } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import { useCallback, useEffect, useRef, useState } from 'react'

const clients = [
  { name: 'TechCorp Industries',   logo: 'TC' },
  { name: 'Global Manufacturing',  logo: 'GM' },
  { name: 'FinServe Solutions',    logo: 'FS' },
  { name: 'HealthCare Plus',       logo: 'HC' },
  { name: 'AutoMotive Leaders',    logo: 'AL' },
  { name: 'Energy Dynamics',       logo: 'ED' },
  { name: 'Retail Networks',       logo: 'RN' },
  { name: 'Logistics Pro',         logo: 'LP' },
]

const testimonials = [
  {
    quote: 'Their AI solution transformed our customer service operations. We saw immediate ROI within the first quarter of implementation.',
    author: 'Jennifer Martinez',
    role: 'VP of Operations',
    company: 'FinServe Solutions',
    initials: 'JM',
    accentColor: '#60a5fa',
    stars: 5,
  },
  {
    quote: 'The IIoT implementation exceeded our expectations. Production efficiency increased by 40% and maintenance costs dropped significantly.',
    author: 'Robert Chang',
    role: 'Plant Director',
    company: 'Global Manufacturing',
    initials: 'RC',
    accentColor: '#34d399',
    stars: 5,
  },
  {
    quote: 'Outstanding training programs. Our team gained practical skills they could apply immediately. Highly recommend their RPA courses.',
    author: 'Lisa Anderson',
    role: 'IT Director',
    company: 'HealthCare Plus',
    initials: 'LA',
    accentColor: '#a78bfa',
    stars: 5,
  },
]

export function ClientsSection() {
  const { t } = useLanguage()

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: true },
    [AutoScroll({ playOnInit: true, stopOnMouseEnter: true, stopOnInteraction: true, speed: 1.5 })]
  )

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const playAfterDelay = useCallback(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll) return

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      autoScroll.play()
    }, 2000)
  }, [emblaApi])

  const handlePointerDown = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('pointerDown', handlePointerDown)
    emblaApi.on('pointerUp', playAfterDelay)
    return () => {
      emblaApi.off('pointerDown', handlePointerDown)
      emblaApi.off('pointerUp', playAfterDelay)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [emblaApi, handlePointerDown, playAfterDelay])

  return (
    <section id="clients" className="py-24 relative overflow-hidden" aria-labelledby="clients-title">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <header className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary tracking-widest uppercase mb-4 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
            Trusted Partners
          </span>
          <h2 id="clients-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {t.clients?.title || 'Trusted by Industry Leaders'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t.clients?.subtitle || 'We partner with forward-thinking organizations across diverse industries'}
          </p>
        </header>

        {/* Client logos Embla Slider */}
        <div 
          className="relative overflow-hidden mb-20 cursor-grab active:cursor-grabbing"
          ref={emblaRef}
          onMouseLeave={playAfterDelay}
          onMouseEnter={handlePointerDown}
        >
          <div className="flex touch-pan-y" aria-label="Our clients">
            {clients.map((client, idx) => (
              <div
                key={`${client.name}-${idx}`}
                className="flex-[0_0_auto] min-w-0 pr-4 sm:pr-8"
              >
                <div className="group bg-card rounded-xl border border-border p-5 flex items-center justify-center gap-3 hover:border-primary/40 hover:bg-primary/3 transition-all duration-300 w-64 h-full">
                  <div
                    className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300"
                    aria-hidden="true"
                  >
                    <span className="text-sm font-bold text-primary">{client.logo}</span>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300 block">
                    {client.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
            {t.clients?.testimonials || 'What Our Clients Say'}
          </h3>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-20" role="list" aria-label="Client testimonials">
          {testimonials.map((testimonial, index) => (
            <blockquote
              key={index}
              className="group bg-card rounded-2xl border border-border p-6 hover:border-primary/35 transition-all duration-500 flex flex-col relative overflow-hidden"
              role="listitem"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 20% 20%, ${testimonial.accentColor}10 0%, transparent 65%)` }}
                aria-hidden="true"
              />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4" aria-label={`${testimonial.stars} out of 5 stars`}>
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                ))}
              </div>

              <Quote
                className="w-7 h-7 mb-3 opacity-30"
                style={{ color: testimonial.accentColor }}
                aria-hidden="true"
              />

              <p className="text-muted-foreground leading-relaxed mb-6 text-pretty flex-1 relative z-10">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <footer className="flex items-center gap-3 relative z-10">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 border"
                  style={{
                    background: `${testimonial.accentColor}18`,
                    borderColor: `${testimonial.accentColor}35`,
                  }}
                  aria-hidden="true"
                >
                  <span className="text-sm font-bold" style={{ color: testimonial.accentColor }}>
                    {testimonial.initials}
                  </span>
                </div>
                <div>
                  <cite className="font-semibold text-foreground not-italic text-sm">{testimonial.author}</cite>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Stats bar */}
        <dl
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-2xl border border-border relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(100,210,210,0.04), rgba(80,180,220,0.02))' }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(100,210,210,0.3), transparent)' }}
            aria-hidden="true"
          />
          {[
            { value: '200+', label: t.clients?.stats?.clients     || 'Clients Worldwide' },
            { value: '500+', label: t.clients?.stats?.projects    || 'Projects Delivered' },
            { value: '98%',  label: t.clients?.stats?.satisfaction || 'Client Satisfaction' },
            { value: '15+',  label: t.clients?.stats?.countries   || 'Countries Served' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-3xl sm:text-4xl font-bold text-primary mb-1.5 tabular-nums">{stat.value}</dd>
              <dt className="text-sm text-muted-foreground">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
