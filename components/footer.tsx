'use client'

import Link from 'next/link'
import { Github, Linkedin, Twitter, Shield } from 'lucide-react'
import { useLanguage } from '@/components/language-context'

export function Footer() {
  const { t } = useLanguage()

  const footerLinks = {
    services: ['AI Consulting', 'Industrial IoT', 'RPA & Automation', 'Responsible AI', 'AI Governance'],
    training: ['Executive AI Training', 'Technical AI & IIoT', 'Responsible AI Training', 'RPA & Automation', 'View All Programmes'],
    company: [t.nav.about, 'Case Studies', 'Insights & Blog', 'Careers', t.nav.contact],
    legal: [t.footer.privacy, t.footer.terms, 'Cookie Policy', 'GDPR Statement'],
  }

  const socialLinks = [
    { icon: Twitter,  href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github,   href: '#', label: 'GitHub' },
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

          {/* Nav columns */}
          {[
            { label: t.nav.services,  links: footerLinks.services,  anchor: '#services'  },
            { label: t.nav.training,  links: footerLinks.training,  anchor: '#training'  },
            { label: 'Company',       links: footerLinks.company,   anchor: '#'          },
            { label: 'Legal',         links: footerLinks.legal,     anchor: '#'          },
          ].map(({ label, links, anchor }) => (
            <nav key={label} aria-label={`${label} navigation`}>
              <h4 className="font-semibold text-foreground mb-4 text-xs uppercase tracking-widest">{label}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href={anchor}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              <span aria-label="Copyright">&copy;</span> {new Date().getFullYear()} TechConsult. {t.footer.copyright}
            </p>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border"
              style={{
                background: 'rgba(52,211,153,0.06)',
                borderColor: 'rgba(52,211,153,0.22)',
              }}
            >
              <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
              <span className="text-xs text-emerald-400 font-medium">{t.footer.gdprNote}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
