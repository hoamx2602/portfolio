'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { type Locale, getTranslation, translations } from '@/lib/i18n'

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

  const t = getTranslation(locale)

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
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
