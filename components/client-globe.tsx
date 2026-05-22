'use client'

import { useEffect, useRef, useState } from 'react'
import createGlobe from 'cobe'
import { useTheme } from 'next-themes'

// Approximate client locations as [lat, lng] pairs.
// Edit these to match your actual client footprint.
const clientLocations: [number, number][] = [
  [51.5074, -0.1278],   // London
  [40.7128, -74.006],   // New York
  [1.3521, 103.8198],   // Singapore
  [25.2048, 55.2708],   // Dubai
  [35.6762, 139.6503],  // Tokyo
  [52.52, 13.405],      // Berlin
  [48.8566, 2.3522],    // Paris
  [-33.8688, 151.2093], // Sydney
  [19.076, 72.8777],    // Mumbai
  [-23.5505, -46.6333], // São Paulo
  [10.8231, 106.6297],  // Ho Chi Minh
  [37.7749, -122.4194], // San Francisco
  [55.7558, 37.6173],   // Moscow
  [-1.2921, 36.8219],   // Nairobi
  [31.7683, 35.2137],   // Jerusalem
  [22.3193, 114.1694],  // Hong Kong
]

function hexToRgb(hex: string): [number, number, number] {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!m) return [0.39, 0.82, 0.82]
  return [
    parseInt(m[1], 16) / 255,
    parseInt(m[2], 16) / 255,
    parseInt(m[3], 16) / 255,
  ]
}

export function ClientGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const phiRef = useRef(0)
  const widthRef = useRef(0)
  const { resolvedTheme } = useTheme()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!canvasRef.current || !wrapperRef.current) return

    const isLight = resolvedTheme === 'light'
    const accent: [number, number, number] = isLight
      ? hexToRgb('#0f8c8c')
      : hexToRgb('#64d2d2')
    const baseColor: [number, number, number] = isLight ? [0.4, 0.6, 0.7] : [0.3, 0.5, 0.6]
    const glowColor: [number, number, number] = isLight ? [0.9, 0.95, 1] : [0.1, 0.3, 0.4]

    const onResize = () => {
      if (wrapperRef.current) widthRef.current = wrapperRef.current.offsetWidth
    }
    onResize()
    window.addEventListener('resize', onResize)

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      phi: 0,
      theta: 0.25,
      dark: isLight ? 0 : 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: isLight ? 1.2 : 4,
      baseColor,
      markerColor: accent,
      glowColor,
      markers: clientLocations.map(([lat, lng]) => ({
        location: [lat, lng],
        size: 0.05,
      })),
    })

    let rafId = 0
    const animate = () => {
      if (pointerInteracting.current === null) {
        phiRef.current += 0.003
      }
      globe.update({
        phi: phiRef.current + pointerInteractionMovement.current / 200,
        width: widthRef.current * 2,
        height: widthRef.current * 2,
      })
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    requestAnimationFrame(() => setReady(true))

    return () => {
      cancelAnimationFrame(rafId)
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [resolvedTheme])

  return (
    <div
      ref={wrapperRef}
      className="relative w-full aspect-square max-w-[600px] mx-auto"
    >
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current =
            e.clientX - pointerInteractionMovement.current
          if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing'
        }}
        onPointerUp={() => {
          pointerInteracting.current = null
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
        }}
        onPointerOut={() => {
          pointerInteracting.current = null
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current
            pointerInteractionMovement.current = delta
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current
            pointerInteractionMovement.current = delta
          }
        }}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          contain: 'layout paint size',
          opacity: ready ? 1 : 0,
          transition: 'opacity 800ms ease-out',
        }}
        aria-label="Interactive globe showing client locations worldwide"
        role="img"
      />
    </div>
  )
}
