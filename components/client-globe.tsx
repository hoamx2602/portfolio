'use client'

import { useEffect, useRef, useState } from 'react'
import createGlobe from 'cobe'
import { useTheme } from 'next-themes'

interface Deployment {
  city: string
  country: string // ISO-2 country code (for emoji flag)
  lat: number
  lng: number
  industry: string
  highlight: string
}

// Edit this list to reflect your real client footprint.
const deployments: Deployment[] = [
  { city: 'London',        country: 'GB', lat: 51.5074,  lng: -0.1278,   industry: 'Finance',       highlight: 'Risk-modelling AI' },
  { city: 'New York',      country: 'US', lat: 40.7128,  lng: -74.006,   industry: 'Healthcare',    highlight: 'Predictive diagnostics' },
  { city: 'San Francisco', country: 'US', lat: 37.7749,  lng: -122.4194, industry: 'Technology',    highlight: 'AI governance suite' },
  { city: 'São Paulo',     country: 'BR', lat: -23.5505, lng: -46.6333,  industry: 'Agritech',      highlight: 'Crop computer vision' },
  { city: 'Paris',         country: 'FR', lat: 48.8566,  lng: 2.3522,    industry: 'Aerospace',     highlight: 'Predictive maintenance' },
  { city: 'Berlin',        country: 'DE', lat: 52.52,    lng: 13.405,    industry: 'Logistics',     highlight: 'Supply-chain RPA' },
  { city: 'Nairobi',       country: 'KE', lat: -1.2921,  lng: 36.8219,   industry: 'Public Sector', highlight: 'Smart cities pilot' },
  { city: 'Jerusalem',     country: 'IL', lat: 31.7683,  lng: 35.2137,   industry: 'Defence',       highlight: 'Edge inference' },
  { city: 'Dubai',         country: 'AE', lat: 25.2048,  lng: 55.2708,   industry: 'Energy',        highlight: 'IIoT grid monitoring' },
  { city: 'Mumbai',        country: 'IN', lat: 19.076,   lng: 72.8777,   industry: 'BFSI',          highlight: 'Document AI' },
  { city: 'Singapore',     country: 'SG', lat: 1.3521,   lng: 103.8198,  industry: 'Manufacturing', highlight: 'Smart factory rollout' },
  { city: 'Ho Chi Minh',   country: 'VN', lat: 10.8231,  lng: 106.6297,  industry: 'Manufacturing', highlight: 'Quality-control AI' },
  { city: 'Hong Kong',     country: 'HK', lat: 22.3193,  lng: 114.1694,  industry: 'Finance',       highlight: 'Fraud detection' },
  { city: 'Tokyo',         country: 'JP', lat: 35.6762,  lng: 139.6503,  industry: 'Automotive',    highlight: 'Robotics integration' },
  { city: 'Sydney',        country: 'AU', lat: -33.8688, lng: 151.2093,  industry: 'Mining',        highlight: 'Autonomous fleets' },
  { city: 'Moscow',        country: 'RU', lat: 55.7558,  lng: 37.6173,   industry: 'Oil & Gas',     highlight: 'Asset analytics' },
]

// Illustrative connections drawn as glowing arcs.
const arcPairs: [number, number][] = [
  [0, 1],   // London → New York
  [0, 4],   // London → Paris
  [1, 2],   // New York → San Francisco
  [10, 11], // Singapore → Ho Chi Minh
  [10, 13], // Singapore → Tokyo
  [8, 9],   // Dubai → Mumbai
  [13, 14], // Tokyo → Sydney
  [4, 5],   // Paris → Berlin
]

const countryCount = new Set(deployments.map((d) => d.country)).size

function flagFromCC(cc: string) {
  if (cc.length !== 2) return ''
  return cc
    .toUpperCase()
    .split('')
    .map((c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
    .join('')
}

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
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null)
  const widthRef = useRef(0)
  const phiRef = useRef(0)
  const targetPhiRef = useRef(0)
  const thetaRef = useRef(0.25)
  const targetThetaRef = useRef(0.25)
  const pointerDownX = useRef<number | null>(null)
  const pointerDelta = useRef(0)
  const pauseUntilRef = useRef(0)
  const accentRef = useRef<[number, number, number]>([0.39, 0.82, 0.82])

  const { resolvedTheme } = useTheme()
  const [activeIndex, setActiveIndex] = useState(0)
  const [ready, setReady] = useState(false)

  // Cycle through deployments unless user paused the tour
  useEffect(() => {
    const id = setInterval(() => {
      if (Date.now() < pauseUntilRef.current) return
      setActiveIndex((i) => (i + 1) % deployments.length)
    }, 3500)
    return () => clearInterval(id)
  }, [])

  // When active deployment changes: set target rotation + refresh markers
  useEffect(() => {
    const d = deployments[activeIndex]

    // Cobe convention: a point (lat, lng) sits at screen center when
    //   phi   = -(lng_rad) - π/2
    //   theta = lat_rad
    const lngRad = (d.lng * Math.PI) / 180
    const latRad = (d.lat * Math.PI) / 180
    const targetPhi = -lngRad - Math.PI / 2

    // Pick shortest rotation direction relative to current phi
    const curr = phiRef.current
    let delta = targetPhi - (curr % (2 * Math.PI))
    if (delta > Math.PI) delta -= 2 * Math.PI
    if (delta < -Math.PI) delta += 2 * Math.PI
    targetPhiRef.current = curr + delta

    targetThetaRef.current = latRad

    if (globeRef.current) {
      const accent = accentRef.current
      globeRef.current.update({
        markers: deployments.map((dep, i) => ({
          location: [dep.lat, dep.lng] as [number, number],
          size: i === activeIndex ? 0.12 : 0.04,
          color: i === activeIndex ? accent : undefined,
        })),
      })
    }
  }, [activeIndex])

  useEffect(() => {
    if (!canvasRef.current || !wrapperRef.current) return
    const isLight = resolvedTheme === 'light'
    const accent: [number, number, number] = isLight ? hexToRgb('#0f8c8c') : hexToRgb('#64d2d2')
    accentRef.current = accent
    const baseColor: [number, number, number] = isLight ? [0.4, 0.6, 0.7] : [0.3, 0.5, 0.6]
    const glowColor: [number, number, number] = isLight ? [0.9, 0.95, 1] : [0.1, 0.3, 0.4]

    const onResize = () => {
      if (wrapperRef.current) widthRef.current = wrapperRef.current.offsetWidth
    }
    onResize()
    window.addEventListener('resize', onResize)

    const arcs = arcPairs.map(([from, to]) => ({
      from: [deployments[from].lat, deployments[from].lng] as [number, number],
      to: [deployments[to].lat, deployments[to].lng] as [number, number],
    }))

    const initialIndex = activeIndex
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
      markers: deployments.map((d, i) => ({
        location: [d.lat, d.lng],
        size: i === initialIndex ? 0.12 : 0.04,
        color: i === initialIndex ? accent : undefined,
      })),
      arcs,
      arcColor: accent,
      arcWidth: 0.5,
      arcHeight: 0.3,
    })
    globeRef.current = globe

    let rafId = 0
    const animate = () => {
      // Ease both phi (longitude) and theta (latitude tilt) toward the active target.
      // Slower lerp = the globe is almost always visibly in motion between locations.
      if (pointerDownX.current === null && Date.now() > pauseUntilRef.current) {
        phiRef.current += (targetPhiRef.current - phiRef.current) * 0.025
        thetaRef.current += (targetThetaRef.current - thetaRef.current) * 0.025
      }
      globe.update({
        phi: phiRef.current + pointerDelta.current / 200,
        theta: thetaRef.current,
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
      globeRef.current = null
      window.removeEventListener('resize', onResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedTheme])

  const active = deployments[activeIndex]

  const jumpTo = (i: number) => {
    setActiveIndex(i)
    pauseUntilRef.current = Date.now() + 12000
  }

  return (
    <div className="relative w-full max-w-[720px] mx-auto">
      {/* Floating info card */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-[min(92%,440px)] pointer-events-none">
        <div
          key={activeIndex}
          className="animate-in fade-in slide-in-from-top-2 duration-500 bg-card/85 backdrop-blur-xl border border-primary/25 rounded-2xl px-4 py-3 shadow-[0_0_40px_rgba(100,210,210,0.12)]"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl leading-none shrink-0" aria-hidden="true">
              {flagFromCC(active.country)}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-bold text-foreground text-base sm:text-lg truncate">
                  {active.city}
                </span>
                <span className="text-xs text-muted-foreground">· {active.industry}</span>
              </div>
              <div className="text-xs sm:text-sm text-primary/90 truncate">
                {active.highlight}
              </div>
            </div>
            <span className="flex items-center gap-1.5 text-[10px] tracking-[0.18em] font-bold text-primary shrink-0">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              LIVE
            </span>
          </div>
        </div>
      </div>

      {/* Globe canvas */}
      <div ref={wrapperRef} className="relative w-full aspect-square max-w-[600px] mx-auto">
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            pointerDownX.current = e.clientX - pointerDelta.current
            pauseUntilRef.current = Date.now() + 10000
            if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing'
          }}
          onPointerUp={() => {
            // Absorb the drag offset into phi so the globe stays where the user left it
            phiRef.current += pointerDelta.current / 200
            pointerDelta.current = 0
            targetPhiRef.current = phiRef.current
            pointerDownX.current = null
            if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
          }}
          onPointerOut={() => {
            phiRef.current += pointerDelta.current / 200
            pointerDelta.current = 0
            targetPhiRef.current = phiRef.current
            pointerDownX.current = null
            if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
          }}
          onMouseMove={(e) => {
            if (pointerDownX.current !== null) {
              pointerDelta.current = e.clientX - pointerDownX.current
            }
          }}
          onTouchMove={(e) => {
            if (pointerDownX.current !== null && e.touches[0]) {
              pointerDelta.current = e.touches[0].clientX - pointerDownX.current
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
          aria-label="Interactive globe touring client deployments worldwide"
          role="img"
        />
      </div>

      {/* Dot navigation */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-md mx-auto">
        {deployments.map((d, i) => (
          <button
            key={d.city}
            onClick={() => jumpTo(i)}
            aria-label={`Show ${d.city}`}
            title={d.city}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'w-6 bg-primary shadow-[0_0_10px_rgba(100,210,210,0.55)]'
                : 'w-2 bg-muted hover:bg-primary/50'
            }`}
          />
        ))}
      </div>

      <p className="mt-3 text-center text-xs text-muted-foreground/70 tracking-wide">
        {deployments.length} deployments · {countryCount} countries · drag globe or tap a dot
      </p>
    </div>
  )
}
