'use client'

import { createContext, useContext, useState, useCallback, useMemo, useEffect, type ReactNode } from 'react'
import { type Locale, getTranslation, translations, isRTL } from '@/lib/i18n'

type TranslationType = typeof translations.en

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: TranslationType
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
  }, [])

  const t = useMemo(() => getTranslation(locale), [locale])

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t])

  // Handle RTL + lang attribute + Arabic font
  useEffect(() => {
    const html = document.documentElement
    const rtl = isRTL(locale)
    html.setAttribute('dir', rtl ? 'rtl' : 'ltr')
    html.setAttribute('lang', locale)

    // Load Noto Sans Arabic font when needed
    const fontId = 'noto-sans-arabic-font'
    if (rtl) {
      if (!document.getElementById(fontId)) {
        const link = document.createElement('link')
        link.id = fontId
        link.rel = 'stylesheet'
        link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap'
        document.head.appendChild(link)
      }
      html.style.fontFamily = "'Noto Sans Arabic', sans-serif"
    } else {
      html.style.fontFamily = ''
    }
  }, [locale])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
