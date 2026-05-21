'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle2, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useLanguage } from '@/components/language-context'

export function ContactSection() {
  const { t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)

  const contactInfo = [
    { icon: Mail,   label: 'Email',   value: t.contact.info.email,   href: `mailto:${t.contact.info.email}` },
    { icon: Phone,  label: 'Phone',   value: t.contact.info.phone,   href: `tel:${t.contact.info.phone}` },
    { icon: MapPin, label: 'Address', value: t.contact.info.address, href: '#' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
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

            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Message Sent!</h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form className="space-y-5" aria-label="Contact form" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">{t.contact.form.name}</Label>
                    <Input
                      id="contact-name"
                      name="name"
                      placeholder="John Doe"
                      required
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
                    className="bg-background/60 border-border/60 focus:border-primary/60 transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full gap-2 h-12 text-base relative overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, oklch(0.72 0.15 185), oklch(0.60 0.14 200))',
                    boxShadow: '0 0 20px rgba(100,210,210,0.18)',
                  }}
                >
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Send className="w-4 h-4" aria-hidden="true" />
                  {t.contact.form.send}
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
                className="gap-2 border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all duration-300"
              >
                <Calendar className="w-4 h-4" aria-hidden="true" />
                Book a Free Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
