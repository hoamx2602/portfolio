import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token     = process.env.SANITY_API_TOKEN

if (!projectId || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  token,
  apiVersion: '2024-05-21',
})

// ── All 4 case studies ───────────────────────────────────────────────────────
const projects = [
  {
    _type: 'project',
    _id:   'project-smart-factory',
    id:    'smart-factory',
    title: 'Smart Factory Transformation',
    client: 'Global Manufacturing Corp',
    category: 'iiot',
    categoryColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
    description: 'Implemented a comprehensive IIoT solution reducing downtime by 40% and increasing production efficiency by 25%.',
    metrics: [
      { _key: 'm1', value: '40%',  label: 'Downtime Reduction' },
      { _key: 'm2', value: '25%',  label: 'Efficiency Increase' },
      { _key: 'm3', value: '$2M',  label: 'Annual Savings' },
    ],
    gradientFrom: 'rgba(52,211,153,0.25)',
    gradientTo:   'rgba(34,211,238,0.10)',
    accentColor:  '#34d399',
    iconLabel:    'IIoT',
    fullDescription: 'A complete digital transformation of a 50-year-old manufacturing facility, bringing Industry 4.0 capabilities to legacy equipment through strategic IoT sensor deployment and real-time analytics.',
    challenge: 'The client faced significant production losses due to unexpected equipment failures and inefficient maintenance schedules. Their legacy systems lacked visibility into machine health and performance metrics.',
    solution: 'We deployed over 500 IoT sensors across critical machinery, implemented edge computing for real-time data processing, and built a centralized dashboard for predictive maintenance alerts. Machine learning models were trained on historical data to predict failures 72 hours in advance.',
    results: [
      'Reduced unplanned downtime by 40%',
      'Increased overall equipment effectiveness (OEE) by 25%',
      'Achieved $2M in annual cost savings',
      'Reduced maintenance costs by 30%',
      'Improved worker safety with real-time hazard detection',
    ],
    technologies: ['Azure IoT Hub', 'Apache Kafka', 'TensorFlow', 'Power BI', 'Edge Computing'],
  },
  {
    _type: 'project',
    _id:   'project-ai-customer-service',
    id:    'ai-customer-service',
    title: 'AI-Powered Customer Service',
    client: 'FinTech Solutions Ltd',
    category: 'ai',
    categoryColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    description: 'Deployed conversational AI handling 80% of customer inquiries automatically with 95% satisfaction rate.',
    metrics: [
      { _key: 'm1', value: '80%', label: 'Automation Rate' },
      { _key: 'm2', value: '95%', label: 'Satisfaction Score' },
      { _key: 'm3', value: '60%', label: 'Cost Reduction' },
    ],
    gradientFrom: 'rgba(96,165,250,0.25)',
    gradientTo:   'rgba(34,211,238,0.10)',
    accentColor:  '#60a5fa',
    iconLabel:    'AI',
    fullDescription: 'An intelligent customer service platform combining natural language processing, sentiment analysis, and multi-channel support to deliver exceptional customer experiences at scale.',
    challenge: 'The financial services company was struggling with high call volumes, long wait times, and inconsistent service quality. Customer satisfaction scores were declining, and operational costs were increasing.',
    solution: 'We developed a multi-channel AI assistant using advanced NLP models, integrated with their existing CRM and knowledge base. The system handles complex financial queries, performs secure account lookups, and seamlessly escalates to human agents when needed.',
    results: [
      'Automated 80% of routine customer inquiries',
      'Achieved 95% customer satisfaction rating',
      'Reduced support costs by 60%',
      'Decreased average response time from 15 minutes to 30 seconds',
      'Enabled 24/7 customer support availability',
    ],
    technologies: ['OpenAI GPT-4', 'LangChain', 'Pinecone', 'Twilio', 'Salesforce Integration'],
  },
  {
    _type: 'project',
    _id:   'project-enterprise-rpa',
    id:    'enterprise-rpa',
    title: 'Enterprise Process Automation',
    client: 'Healthcare Systems Inc',
    category: 'rpa',
    categoryColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    description: 'Automated 200+ business processes saving 50,000 hours annually across multiple departments.',
    metrics: [
      { _key: 'm1', value: '200+',  label: 'Processes Automated' },
      { _key: 'm2', value: '50K',   label: 'Hours Saved/Year' },
      { _key: 'm3', value: '99.9%', label: 'Accuracy Rate' },
    ],
    gradientFrom: 'rgba(251,146,60,0.25)',
    gradientTo:   'rgba(245,158,11,0.10)',
    accentColor:  '#fb923c',
    iconLabel:    'RPA',
    fullDescription: 'A comprehensive robotic process automation implementation that transformed back-office operations across finance, HR, and patient services in a major healthcare network.',
    challenge: 'The healthcare organization was burdened by manual, repetitive processes across departments — leading to errors, delays, and staff burnout. Claims processing alone required 40 FTEs and had a 5% error rate.',
    solution: 'We conducted process mining to identify automation opportunities, designed and deployed 200+ RPA bots using UiPath, and implemented an intelligent orchestration layer. Bots handle everything from claims processing to employee onboarding.',
    results: [
      'Automated 200+ business processes',
      'Saved 50,000 work hours annually',
      'Achieved 99.9% accuracy rate',
      'Reduced claims processing time by 75%',
      'Freed up 35 FTEs for higher-value work',
    ],
    technologies: ['UiPath', 'Process Mining', 'OCR', 'Azure Functions', 'SQL Server'],
  },
  {
    _type: 'project',
    _id:   'project-aramco-ai-training',
    id:    'aramco-ai-training',
    title: 'Enterprise AI & Cyber-Threat Training Programme',
    client: 'Saudi Aramco',
    category: 'training',
    categoryColor: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    description: 'Delivered a comprehensive training programme on IoT infrastructure, applied AI, and DeepFake threat awareness to 1,200+ engineers and security professionals across Aramco facilities.',
    metrics: [
      { _key: 'm1', value: '1,200+', label: 'Staff Trained' },
      { _key: 'm2', value: '94%',    label: 'Competency Score' },
      { _key: 'm3', value: '3',      label: 'Technology Tracks' },
    ],
    gradientFrom: 'rgba(139,92,246,0.25)',
    gradientTo:   'rgba(59,130,246,0.10)',
    accentColor:  '#8b5cf6',
    iconLabel:    'AI',
    fullDescription: "Skilpex partnered with Saudi Aramco — one of the world's largest energy companies — to design and deliver a multi-track technology training programme across its operational and corporate divisions. The programme covered Industrial IoT sensor networks, practical AI applications in the energy sector, and critical DeepFake threat-awareness training to protect executives and operational integrity.",
    challenge: "As Aramco accelerated its digital transformation strategy, a widening skills gap emerged across engineering, IT, and security teams. Staff lacked hands-on exposure to modern AI tooling and were largely unaware of the growing risk of synthetic media attacks — including voice cloning and video DeepFakes — used in corporate fraud and social engineering campaigns.",
    solution: "We designed a modular, instructor-led curriculum split into three specialist tracks: (1) Industrial IoT — covering sensor deployment, edge computing, and real-time telemetry for oil & gas infrastructure; (2) Applied AI — including machine learning fundamentals, predictive maintenance models, and AI-driven anomaly detection; (3) DeepFake & Synthetic Media Awareness — teaching staff to identify AI-generated audio and video content, understand attack vectors, and apply verification protocols. Training was delivered on-site across multiple Aramco locations with hands-on lab environments.",
    results: [
      'Trained 1,200+ engineers, analysts, and security professionals',
      'Achieved 94% average competency score across all tracks',
      'Reduced reported social-engineering incidents by 60% within 6 months',
      'Established an internal IoT Centre of Excellence at Aramco HQ',
      'Participants built live predictive maintenance dashboards during training',
      "Programme adopted as part of Aramco's standard onboarding for technical roles",
    ],
    technologies: [
      'Azure IoT Hub',
      'TensorFlow',
      'Python',
      'FaceForensics++',
      'Microsoft Sentinel',
      'Power BI',
      'Custom LMS',
    ],
  },
]

// ── Upsert (createOrReplace) — safe to run multiple times ───────────────────
async function seed() {
  console.log(`\nConnecting to Sanity project "${projectId}" (${dataset})...\n`)
  let ok = 0
  for (const doc of projects) {
    try {
      await client.createOrReplace(doc)
      console.log(`  ✓ Upserted: ${doc.title} [${doc._id}]`)
      ok++
    } catch (err) {
      console.error(`  ✗ Failed:  ${doc.title}`, err.message)
    }
  }
  console.log(`\nDone — ${ok}/${projects.length} projects upserted to Sanity.\n`)
}

seed()
