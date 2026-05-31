import { cache } from 'react'
import { client } from './client'
import type { SiteSettingsValue } from '@/components/site-settings-context'

const QUERY = `*[_type == "siteSettings"][0]{
  sections,
  bookingUrl,
  "contact": {
    "email":   contactEmail,
    "phone":   contactPhone,
    "address": contactAddress
  }
}`

export const getSiteSettings = cache(
  async (): Promise<SiteSettingsValue> => {
    try {
      const data = await client.fetch<SiteSettingsValue>(
        QUERY,
        {},
        { next: { revalidate: 30 } }
      )
      return data ?? { sections: {} }
    } catch {
      return { sections: {} }
    }
  }
)
