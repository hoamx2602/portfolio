import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token:     process.env.SANITY_API_TOKEN,
  useCdn:    false,
  apiVersion: '2024-05-21',
})

// Keep only these stable IDs — delete everything else of type 'project'
const KEEP_IDS = [
  'project-smart-factory',
  'project-ai-customer-service',
  'project-enterprise-rpa',
  'project-aramco-ai-training',
  'project-secure-pptx-viewer',
  'project-ai-car-care',
]

async function cleanup() {
  console.log('Fetching all project documents from Sanity...')
  const all = await client.fetch(`*[_type == "project"]{ _id, id, title }`)
  console.log(`Found ${all.length} project documents total.\n`)

  const toDelete = all.filter((doc) => !KEEP_IDS.includes(doc._id))

  if (toDelete.length === 0) {
    console.log('Nothing to delete — all documents already clean.')
    return
  }

  console.log(`Deleting ${toDelete.length} duplicate(s):`)
  for (const doc of toDelete) {
    await client.delete(doc._id)
    console.log(`  ✗ Deleted: "${doc.title}" [${doc._id}]`)
  }

  const remaining = await client.fetch(`*[_type == "project"]{ _id, id, title }`)
  console.log(`\nDone — ${remaining.length} project(s) remaining:`)
  for (const doc of remaining) {
    console.log(`  ✓ ${doc.title} [${doc._id}]`)
  }
}

cleanup().catch((err) => {
  console.error(err)
  process.exit(1)
})
