'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Github, Linkedin, Twitter, Shield } from 'lucide-react'
import { useLanguage } from '@/components/language-context'
import { client } from '@/sanity/lib/client'

type LegalLink = { title: string; slug: string }

const LEGAL_QUERY = `*[_type == "legalPage"] | order(title asc) { title, "slug": slug.current }`

export function Footer() {
  const { t } = useLanguage()
  const [legalLinks, setLegalLinks] = useState<LegalLink[]>([])

  useEffect(() => {
    client.fetch<LegalLink[]>(LEGAL_QUERY).then((data) => setLegalLinks(data ?? []))
  }, [])

  const footerLinks = {
    services: ['AI Consulting', 'Industrial IoT', 'Robotic Process Automation', 'Responsible AI', 'AI Governance'],
    training: ['Executive AI Training', 'Technical AI & IIoT', 'Responsible AI Training', 'Robotic Process Automation', 'View All Programmes'],
    company:  [t.nav.about, 'Case Studies', 'Insights & Blog', 'Careers', t.nav.contact],
  }

  const socialLinks = [
    { icon: Twitter,  href: '#', label: 'Twitter'  },
    { icon: Linkedin, href: '#', label: 'LinkedIn'  },
    { icon: Github,   href: '#', label: 'GitHub'    },
  ]

  return (
    <footer className="border-t border-border relative overflow-hidden" role="contentinfo">
      {/* Subtle top shimmer */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(100,210,210,0.25), transparent)' }}
        aria-hidden="true"
      />

      {/* Background */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, oklch(0.15 0.02 240), oklch(0.13 0.02 240))' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5" aria-label="TechConsult - Home">
              <div
                className="h-9 w-9 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.72 0.15 185), oklch(0.60 0.14 200))',
                  boxShadow: '0 0 20px rgba(100,210,210,0.25)',
                }}
                aria-hidden="true"
              >
                <span className="text-primary-foreground font-bold text-sm">TC</span>
              </div>
              <span className="text-lg font-semibold text-foreground">TechConsult</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              {t.footer.description}
            </p>
            <nav aria-label="Social media links" className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 rounded-full bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 hover:scale-110 transition-all duration-200"
                  aria-label={`Follow us on ${social.label}`}
                >
                  <social.icon className="w-4 h-4" aria-hidden="true" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <nav aria-label="Services navigation">
            <h4 className="font-semibold text-foreground mb-4 text-xs uppercase tracking-widest">
              {t.nav.services}
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link}>
                  <Link
                    href="#services"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Training */}
          <nav aria-label="Training navigation">
            <h4 className="font-semibold text-foreground mb-4 text-xs uppercase tracking-widest">
              {t.nav.training}
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.training.map((link) => (
                <li key={link}>
                  <Link
                    href="#training"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company navigation">
            <h4 className="font-semibold text-foreground mb-4 text-xs uppercase tracking-widest">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal — fetched from Sanity */}
          <nav aria-label="Legal navigation">
            <h4 className="font-semibold text-foreground mb-4 text-xs uppercase tracking-widest">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.length > 0 ? (
                legalLinks.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={`/legal/${page.slug}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {page.title}
                    </Link>
                  </li>
                ))
              ) : (
                // Skeleton while loading
                Array.from({ length: 4 }).map((_, i) => (
                  <li key={i}>
                    <div className="h-4 bg-muted/40 rounded animate-pulse" style={{ width: `${60 + i * 10}%` }} />
                  </li>
                ))
              )}
            </ul>
          </nav>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              <span aria-label="Copyright">&copy;</span> {new Date().getFullYear()} TechConsult.{' '}
              {t.footer.copyright}
            </p>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border"
              style={{
                background: 'rgba(52,211,153,0.06)',
                borderColor: 'rgba(52,211,153,0.22)',
              }}
            >
              <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                {t.footer.gdprNote}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
