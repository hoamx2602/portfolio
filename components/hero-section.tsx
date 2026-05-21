'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, Shield, Cpu, Zap, Bot, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/language-context'

const techBadges = [
  { label: 'Responsible AI', icon: Shield },
  { label: 'Industrial IoT', icon: Cpu },
  { label: 'AI & Machine Learning', icon: Zap },
  { label: 'RPA & Automation', icon: Bot },
  { label: 'AI Governance', icon: Shield },
]

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let width = 0
    let height = 0

    const particles: {
      x: number; y: number; vx: number; vy: number; r: number; alpha: number
    }[] = []

    const resize = () => {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }

    const init = () => {
      resize()
      particles.length = 0
      const count = Math.floor((width * height) / 12000)
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.5 + 0.2,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(100, 210, 210, ${0.12 * (1 - dist / 120)})`
            ctx.lineWidth = 0.6
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(100, 210, 210, ${p.alpha})`
        ctx.fill()

        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
      })

      animationId = requestAnimationFrame(draw)
    }

    init()
    draw()

    const ro = new ResizeObserver(() => { resize() })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animationId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      aria-labelledby="hero-title"
    >
      {/* Deep dark gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.08_0.03_240)] via-background to-[oklch(0.10_0.04_220)]" />

      {/* Particle network canvas */}
      <ParticleCanvas />

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

        {/* Glassmorphism tagline badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm text-sm font-medium text-primary">
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{t.hero.tagline}</span>
        </div>

        <h1
          id="hero-title"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-balance"
          style={{
            background: 'linear-gradient(135deg, oklch(0.95 0.01 240) 0%, oklch(0.72 0.15 185) 50%, oklch(0.85 0.10 200) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
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
            className="gap-2 px-8 h-12 text-base relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, oklch(0.72 0.15 185), oklch(0.60 0.14 200))',
              boxShadow: '0 0 30px rgba(100, 210, 210, 0.25)',
            }}
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
