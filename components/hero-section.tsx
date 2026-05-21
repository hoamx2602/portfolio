'use client'

import { useEffect, useRef } from 'react'
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
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />



      {/* Radial glow spots */}
      <div
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(100,210,210,0.07) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(80,180,200,0.05) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(100,210,210,1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(100,210,210,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">

        <h1
          id="hero-title"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-balance bg-gradient-to-br from-foreground via-primary to-foreground bg-clip-text text-transparent"
        >
          {t.hero.title}
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed text-pretty">
          {t.hero.subtitle}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="gap-2 px-8 h-12 text-base relative overflow-hidden group bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_rgba(100,210,210,0.25)]"
          >
            <Link href="#contact">
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {t.hero.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 duration-200" aria-hidden="true" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 px-8 h-12 text-base border-primary/30 hover:border-primary/60 hover:bg-primary/5 backdrop-blur-sm transition-all duration-300"
          >
            <Link href="#training">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              {t.hero.exploreTraining}
            </Link>
          </Button>
        </div>

        {/* Trust signal */}
        <p className="mt-6 text-sm text-muted-foreground/50">
          {t.hero.trustSignal}
        </p>

        {/* Tech badges */}
        <nav aria-label="Technology expertise" className="mt-14 flex flex-wrap items-center justify-center gap-3">
          {techBadges.map((badge, i) => (
            <span
              key={`${badge.label}-${i}`}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground bg-secondary/40 rounded-lg border border-border hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all duration-300 cursor-default backdrop-blur-sm"
            >
              <badge.icon className="w-3.5 h-3.5" aria-hidden="true" />
              {badge.label}
            </span>
          ))}
        </nav>

        {/* Scroll indicator */}
        <div className="mt-20 flex flex-col items-center gap-2 animate-bounce opacity-40" aria-hidden="true">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-primary/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
        </div>
      </div>
    </section>
  )
}
