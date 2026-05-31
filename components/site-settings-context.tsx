'use client'

import { createContext, useContext, type ReactNode } from 'react'

export type SiteSettingsSections = {
  hero?:          boolean
  whyUs?:         boolean
  about?:         boolean
  services?:      boolean
  responsibleAI?: boolean
  training?:      boolean
  projects?:      boolean
  team?:          boolean
  clients?:       boolean
  blog?:          boolean
  contact?:       boolean
}

export type SiteSettingsValue = {
  sections:   SiteSettingsSections
  bookingUrl?: string
  contact?: {
    email?:   string
    phone?:   string
    address?: string
  }
}

const SiteSettingsContext = createContext<SiteSettingsValue>({ sections: {} })

export function SiteSettingsProvider({
  value,
  children,
}: {
  value: SiteSettingsValue
  children: ReactNode
}) {
  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext)
}
