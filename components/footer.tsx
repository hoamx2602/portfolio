'use client'

import Link from 'next/link'
import { Github, Linkedin, Twitter } from 'lucide-react'
import { useLanguage } from '@/components/language-context'

export function Footer() {
  const { t } = useLanguage()

  const footerLinks = {
    services: ['AI Consulting', 'IIoT Solutions', 'RPA Implementation', 'Training Programs'],
    company: [t.nav.about, t.nav.projects, 'Careers', 'Blog'],
    legal: [t.footer.privacy, t.footer.terms, 'Cookie Policy'],
  }

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
  ]

  return (
    <footer className="border-t border-border bg-card" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4" aria-label="TechConsult - Home">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center" aria-hidden="true">
                <span className="text-primary-foreground font-bold text-sm">TC</span>
              </div>
              <span className="text-lg font-semibold text-foreground">TechConsult</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Empowering businesses with cutting-edge technology solutions and expert training.
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
            <h4 className="font-semibold text-foreground mb-4">{t.nav.services}</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link}>
                  <Link href="#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company navigation">
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
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
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
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

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            <span aria-label="Copyright">&copy;</span> {new Date().getFullYear()} TechConsult. {t.footer.copyright}
          </p>
          <p className="text-sm text-muted-foreground">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
