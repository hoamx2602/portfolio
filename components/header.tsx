'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLanguage } from '@/components/language-context'
import { type Locale, locales, isRTL } from '@/lib/i18n'

const languageLabels: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  ar: 'العربية',
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { locale, setLocale, t } = useLanguage()

  const navItems = useMemo(() => [
    { href: '#about', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#training', label: t.nav.training },
    { href: '#projects', label: t.nav.projects },
    { href: '#team', label: t.nav.team },
    { href: '#clients', label: t.nav.clients },
    { href: '#contact', label: t.nav.contact },
  ], [t])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">TC</span>
              </div>
              <span className="text-lg font-semibold text-foreground">TechConsult</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:gap-4">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" />
                  <span>{languageLabels[locale]}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {locales.map((l) => (
                  <DropdownMenuItem
                    key={l}
                    onClick={() => setLocale(l)}
                    className={locale === l ? 'bg-accent' : ''}
                  >
                    {languageLabels[l]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-4 py-2">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Globe className="h-4 w-4" />
                      <span>{languageLabels[locale]}</span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {locales.map((l) => (
                      <DropdownMenuItem
                        key={l}
                        onClick={() => setLocale(l)}
                        className={locale === l ? 'bg-accent' : ''}
                      >
                        {languageLabels[l]}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
