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
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
  ]

  return (
    <footer className="border-t border-border bg-card" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4" aria-label="TechConsult - Home">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center" aria-hidden="true">
                <span className="text-primary-foreground font-bold text-sm">TC</span>
              </div>
              <span className="text-lg font-semibold text-foreground">TechConsult</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              {t.footer.description}
            </p>
            <nav aria-label="Social media links" className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={`Follow us on ${social.label}`}
                >
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </Link>
              ))}
            </nav>
          </div>

          <nav aria-label="Services navigation">
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">{t.nav.services}</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link}>
                  <Link href="#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Training navigation">
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">{t.nav.training}</h4>
            <ul className="space-y-2.5">
              {footerLinks.training.map((link) => (
                <li key={link}>
                  <Link href="#training" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company navigation">
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal navigation">
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* GDPR / Compliance badge */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                <span aria-label="Copyright">&copy;</span> {new Date().getFullYear()} TechConsult. {t.footer.copyright}
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <Shield className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" aria-hidden="true" />
              <span className="text-xs text-emerald-400 font-medium">{t.footer.gdprNote}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
