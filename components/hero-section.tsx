'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, Shield, Cpu, Zap, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/language-context'

const techBadges = [
  { label: 'Responsible AI', icon: Shield },
  { label: 'Industrial IoT', icon: Cpu },
  { label: 'AI & Machine Learning', icon: Zap },
  { label: 'RPA & Automation', icon: Bot },
  { label: 'AI Governance', icon: Shield },
]

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      aria-labelledby="hero-title"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(100, 200, 200, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(100, 200, 200, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Floating ambient elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Tagline pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
          <span className="text-xs sm:text-sm font-medium text-primary tracking-wider uppercase">
            {t.hero.tagline}
          </span>
        </div>
        
        <h1 
          id="hero-title"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 text-balance"
        >
          {t.hero.title}
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed text-pretty">
          {t.hero.subtitle}
        </p>

        {/* Two CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="gap-2 px-8 h-12 text-base">
            <Link href="#contact">
              {t.hero.cta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2 px-8 h-12 text-base">
            <Link href="#training">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              {t.hero.exploreTraining}
            </Link>
          </Button>
        </div>

        {/* Trust signal */}
        <p className="mt-5 text-sm text-muted-foreground/60">
          {t.hero.trustSignal}
        </p>

        {/* Tech badges */}
        <nav aria-label="Technology expertise" className="mt-14 flex flex-wrap items-center justify-center gap-3">
          {techBadges.map((badge) => (
            <span
              key={badge.label}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground bg-secondary/50 rounded-lg border border-border hover:border-primary/50 hover:text-primary transition-colors cursor-default"
            >
              <badge.icon className="w-3.5 h-3.5" aria-hidden="true" />
              {badge.label}
            </span>
          ))}
        </nav>
      </div>
    </section>
  )
}
