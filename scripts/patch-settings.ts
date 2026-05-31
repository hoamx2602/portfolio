import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function patchSettings() {
  // Find the existing siteSettings document
  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "siteSettings"][0]{ _id }`
  )

  const sections = {
    hero: true,
    whyUs: true,
    about: true,
    services: true,
    responsibleAI: true,
    training: true,
    projects: true,
    team: false,   // ← hidden
    clients: true,
    blog: true,
    contact: true,
  }

  // Set to your Calendly / Cal.com / booking URL
  const bookingUrl = process.env.BOOKING_URL ?? ''

  const patch: Record<string, unknown> = { sections }
  if (bookingUrl) patch.bookingUrl = bookingUrl

  if (existing?._id) {
    await client
      .patch(existing._id)
      .set(patch)
      .commit()
    console.log(`✓ Patched siteSettings (${existing._id})`)
  } else {
    // Create fresh siteSettings document if none exists
    const created = await client.create({
      _type: 'siteSettings',
      theme: 'system',
      sections,
    })
    console.log(`✓ Created siteSettings (${created._id})`)
  }

  console.log('\nSection visibility:')
  Object.entries(sections).forEach(([key, val]) => {
    console.log(`  ${val ? '✅' : '🔴'} ${key}`)
  })
}

patchSettings().catch((err) => {
  console.error('Failed:', err.message)
  process.exit(1)
})
