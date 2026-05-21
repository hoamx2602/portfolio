'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { client } from '@/sanity/lib/client'

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const [settings, setSettings] = useState<any>(null)

  useEffect(() => {
    // Force direct API access, bypass CDN caching for immediate updates
    const noCacheClient = client.withConfig({ useCdn: false })
    noCacheClient.fetch(`*[_type == "siteSettings"][0]`)
      .then(setSettings)
      .catch(console.error)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let width = 0
    let height = 0
    let pageHeight = 0

    const isLight = resolvedTheme === 'light'
    
    // Parse colors from settings or use defaults
    const lightColor = settings?.particleColorLight ? hexToRgb(settings.particleColorLight) || '15, 140, 140' : '15, 140, 140'
    const darkColor = settings?.particleColorDark ? hexToRgb(settings.particleColorDark) || '100, 210, 210' : '100, 210, 210'
    const rgb = isLight ? lightColor : darkColor
    const sizeMultiplier = settings?.particleSize || 1.0

    console.log('[ParticleCanvas] settings:', settings)
    console.log('[ParticleCanvas] using rgb:', rgb, 'sizeMultiplier:', sizeMultiplier)

    const particles: {
      x: number; y: number; vx: number; vy: number; r: number; alpha: number
    }[] = []

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      pageHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      )
    }

    const init = () => {
      resize()
      particles.length = 0
      // Calculate count based on the entire page volume
      const count = Math.floor((width * pageHeight) / 10000)
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * pageHeight,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          r: (Math.random() * 2.5 + 1.5) * sizeMultiplier, // Scaled by setting
          alpha: Math.random() * 0.6 + 0.4, // More opaque
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      
      const scrollY = window.scrollY

      ctx.save()
      ctx.translate(0, -scrollY)

      // Only process particles that are near the viewport for performance
      const visibleParticles = particles.filter(p => 
        p.y >= scrollY - 150 && p.y <= scrollY + height + 150
      )

      // Draw connections
      for (let i = 0; i < visibleParticles.length; i++) {
        for (let j = i + 1; j < visibleParticles.length; j++) {
          const dx = visibleParticles[i].x - visibleParticles[j].x
          const dy = visibleParticles[i].y - visibleParticles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) { // Increased distance
            ctx.beginPath()
            // Make lines much more visible
            ctx.strokeStyle = `rgba(${rgb}, ${0.5 * (1 - dist / 150)})` 
            ctx.lineWidth = 1.2
            ctx.moveTo(visibleParticles[i].x, visibleParticles[i].y)
            ctx.lineTo(visibleParticles[j].x, visibleParticles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw particles
      visibleParticles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb}, ${p.alpha})`
        ctx.fill()
      })

      // Update all particles (even if not visible) so movement is continuous
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > pageHeight) p.vy *= -1
      })

      ctx.restore()

      animationId = requestAnimationFrame(draw)
    }

    init()
    draw()

    const ro = new ResizeObserver(() => {
      resize()
      // Don't re-init fully on resize unless height changes drastically, 
      // but for simplicity we can just adjust the canvas size
      // to keep performance smooth.
    })
    ro.observe(document.body)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      ro.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [resolvedTheme, settings]) // Re-run effect when theme or settings changes

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.8 }}
      aria-hidden="true"
    />
  )
}
