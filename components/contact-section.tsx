'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle2, Calendar, Loader2, AlertCircle, X, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useLanguage } from '@/components/language-context'

type Status = 'idle' | 'loading' | 'success' | 'error'

type ContactInfo = {
  email?:   string
  phone?:   string
  address?: string
}

type Props = {
  bookingUrl?:  string
  contactInfo?: ContactInfo
}

// Services known to block iframe embedding via X-Frame-Options / CSP
const IFRAME_BLOCKED_HOSTS = [
  'calendar.app.google',
  'calendar.google.com',
  'outlook.office.com',
  'outlook.live.com',
  'outlook.office365.com',
  'teams.microsoft.com',
  'meet.google.com',
]

function supportsIframe(url: string) {
  try {
    const host = new URL(url).hostname
    return !IFRAME_BLOCKED_HOSTS.some((blocked) => host.includes(blocked))
  } catch {
    return false
  }
}

export function ContactSection({ bookingUrl, contactInfo: cms }: Props) {
  const { t } = useLanguage()
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [bookingOpen, setBookingOpen] = useState(false)

  const handleBooking = () => {
    if (!bookingUrl) return
    if (supportsIframe(bookingUrl)) {
      setBookingOpen(true)
    } else {
      window.open(bookingUrl, '_blank', 'noopener,noreferrer')
    }
  }

  // CMS values take priority; fall back to i18n defaults when not configured
  const email   = cms?.email   || t.contact.info.email
  const phone   = cms?.phone   || t.contact.info.phone
  const address = cms?.address || t.contact.info.address

  const contactInfo = [
    { icon: Mail,   label: 'Email',   value: email,   href: `mailto:${email}` },
    { icon: Phone,  label: 'Phone',   value: phone,   href: `tel:${phone}`    },
    { icon: MapPin, label: 'Address', value: address, href: '#'               },
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const form = e.currentTarget
    const data = {
      name:    (form.elements.namedItem('name')    as HTMLInputElement).value,
      email:   (form.elements.namedItem('email')   as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) {
        setErrorMsg(json.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }
      setStatus('success')
      form.reset()
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden" aria-labelledby="contact-title">
      <div className="absolute inset-0 bg-secondary/20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Ambient glow */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(100,210,210,0.04) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary tracking-widest uppercase mb-4 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
            Get In Touch
          </span>
          <h2 id="contact-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {t.contact.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t.contact.subtitle}
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form card */}
          <div className="bg-card rounded-2xl border border-border p-8 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(100,210,210,0.3), transparent)' }}
              aria-hidden="true"
            />

            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Message Sent!</h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground mt-2"
                  onClick={() => setStatus('idle')}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form className="space-y-5" aria-label="Contact form" onSubmit={handleSubmit}>
                {/* Error banner */}
                {status === 'error' && (
                  <div className="flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">{t.contact.form.name}</Label>
                    <Input
                      id="contact-name"
                      name="name"
                      placeholder="John Doe"
                      required
                      disabled={status === 'loading'}
                      autoComplete="name"
                      className="bg-background/60 border-border/60 focus:border-primary/60 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">{t.contact.form.email}</Label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="john@company.com"
                      required
                      disabled={status === 'loading'}
                      autoComplete="email"
                      className="bg-background/60 border-border/60 focus:border-primary/60 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-company">{t.contact.form.company}</Label>
                  <Input
                    id="contact-company"
                    name="company"
                    placeholder="Your Company"
                    disabled={status === 'loading'}
                    autoComplete="organization"
                    className="bg-background/60 border-border/60 focus:border-primary/60 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message">{t.contact.form.message}</Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell us about your project or training needs..."
                    rows={5}
                    required
                    disabled={status === 'loading'}
                    className="bg-background/60 border-border/60 focus:border-primary/60 transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full gap-2 h-12 text-base relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(135deg, oklch(0.72 0.15 185), oklch(0.60 0.14 200))',
                    boxShadow: '0 0 20px rgba(100,210,210,0.18)',
                  }}
                >
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {status === 'loading' ? (
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Send className="w-4 h-4" aria-hidden="true" />
                  )}
                  {status === 'loading' ? 'Sending…' : t.contact.form.send}
                </Button>
              </form>
            )}
          </div>

          {/* Info column */}
          <div className="space-y-5">
            {/* Contact info card */}
            <address className="bg-card rounded-2xl border border-border p-8 not-italic relative overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(100,210,210,0.2), transparent)' }}
                aria-hidden="true"
              />
              <h3 className="text-lg font-semibold text-foreground mb-6">Contact Information</h3>
              <ul className="space-y-5">
                {contactInfo.map((item) => (
                  <li key={item.label} className="flex items-start gap-4 group">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{ background: 'rgba(100,210,210,0.10)', border: '1px solid rgba(100,210,210,0.20)' }}
                      aria-hidden="true"
                    >
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5 uppercase tracking-wider font-medium">{item.label}</p>
                      <a
                        href={item.href}
                        className="text-foreground hover:text-primary transition-colors duration-200 text-sm"
                      >
                        {item.value}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </address>

            {/* Book a call card */}
            <div
              className="rounded-2xl p-8 text-center relative overflow-hidden border border-primary/20"
              style={{ background: 'linear-gradient(135deg, rgba(100,210,210,0.08), rgba(80,180,220,0.04))' }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(100,210,210,0.40), transparent)' }}
                aria-hidden="true"
              />
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Schedule a Consultation
              </h3>
              <p className="text-muted-foreground mb-5 text-sm">
                Book a free 30-minute call with our AI experts
              </p>
              <Button
                variant="outline"
                onClick={handleBooking}
                disabled={!bookingUrl}
                title={!bookingUrl ? 'Booking link not configured yet' : undefined}
                className="gap-2 border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Calendar className="w-4 h-4" aria-hidden="true" />
                Book a Free Call
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking modal */}
      {bookingOpen && bookingUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Book a free call"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setBookingOpen(false)}
          />

          {/* Modal */}
          <div className="relative z-10 w-full max-w-3xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ height: 'min(80vh, 700px)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Schedule a Consultation</p>
                  <p className="text-xs text-muted-foreground">Book a free 30-minute call</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-secondary"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open in tab
                </a>
                <button
                  onClick={() => setBookingOpen(false)}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* iframe */}
            <iframe
              src={bookingUrl}
              title="Book a free call"
              className="flex-1 w-full border-none"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </section>
  )
}
