'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, X, Play, ExternalLink, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/language-context'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'

// Map Sanity category values → human-readable badge labels
const CATEGORY_LABELS: Record<string, string> = {
  ai:       'AI',
  iiot:     'IIoT',
  rpa:      'RPA',
  training: 'AI Training',
}

type Project = {
  id: string
  title: string
  client: string
  category: string
  categoryColor: string
  description: string
  metrics: { label: string; value: string }[]
  gradientFrom: string
  gradientTo: string
  accentColor: string
  iconLabel: string
  fullDescription: string
  challenge: string
  solution: string
  results: string[]
  technologies: string[]
  thumbnail?: string
}

const defaultProjects: Project[] = [
  {
    id: 'smart-factory',
    title: 'Smart Factory Transformation',
    client: 'Global Manufacturing Corp',
    category: 'IIoT',
    categoryColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
    description:
      'Implemented a comprehensive IIoT solution reducing downtime by 40% and increasing production efficiency by 25%.',
    metrics: [
      { value: '40%',  label: 'Downtime Reduction' },
      { value: '25%',  label: 'Efficiency Increase' },
      { value: '$2M',  label: 'Annual Savings' },
    ],
    gradientFrom: 'rgba(52,211,153,0.25)',
    gradientTo:   'rgba(34,211,238,0.10)',
    accentColor:  '#34d399',
    iconLabel:    'IIoT',
    fullDescription:
      'A complete digital transformation of a 50-year-old manufacturing facility, bringing Industry 4.0 capabilities to legacy equipment through strategic IoT sensor deployment and real-time analytics.',
    challenge:
      'The client faced significant production losses due to unexpected equipment failures and inefficient maintenance schedules. Their legacy systems lacked visibility into machine health and performance metrics.',
    solution:
      'We deployed over 500 IoT sensors across critical machinery, implemented edge computing for real-time data processing, and built a centralized dashboard for predictive maintenance alerts. Machine learning models were trained on historical data to predict failures 72 hours in advance.',
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
    id: 'ai-customer-service',
    title: 'AI-Powered Customer Service',
    client: 'FinTech Solutions Ltd',
    category: 'AI',
    categoryColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    description:
      'Deployed conversational AI handling 80% of customer inquiries automatically with 95% satisfaction rate.',
    metrics: [
      { value: '80%', label: 'Automation Rate' },
      { value: '95%', label: 'Satisfaction Score' },
      { value: '60%', label: 'Cost Reduction' },
    ],
    gradientFrom: 'rgba(96,165,250,0.25)',
    gradientTo:   'rgba(34,211,238,0.10)',
    accentColor:  '#60a5fa',
    iconLabel:    'AI',
    fullDescription:
      'An intelligent customer service platform combining natural language processing, sentiment analysis, and multi-channel support to deliver exceptional customer experiences at scale.',
    challenge:
      'The financial services company was struggling with high call volumes, long wait times, and inconsistent service quality. Customer satisfaction scores were declining, and operational costs were increasing.',
    solution:
      'We developed a multi-channel AI assistant using advanced NLP models, integrated with their existing CRM and knowledge base. The system handles complex financial queries, performs secure account lookups, and seamlessly escalates to human agents when needed.',
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
    id: 'enterprise-rpa',
    title: 'Enterprise Process Automation',
    client: 'Healthcare Systems Inc',
    category: 'RPA',
    categoryColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    description:
      'Automated 200+ business processes saving 50,000 hours annually across multiple departments.',
    metrics: [
      { value: '200+', label: 'Processes Automated' },
      { value: '50K',  label: 'Hours Saved/Year' },
      { value: '99.9%', label: 'Accuracy Rate' },
    ],
    gradientFrom: 'rgba(251,146,60,0.25)',
    gradientTo:   'rgba(245,158,11,0.10)',
    accentColor:  '#fb923c',
    iconLabel:    'RPA',
    fullDescription:
      'A comprehensive robotic process automation implementation that transformed back-office operations across finance, HR, and patient services in a major healthcare network.',
    challenge:
      'The healthcare organization was burdened by manual, repetitive processes across departments — leading to errors, delays, and staff burnout. Claims processing alone required 40 FTEs and had a 5% error rate.',
    solution:
      'We conducted process mining to identify automation opportunities, designed and deployed 200+ RPA bots using UiPath, and implemented an intelligent orchestration layer. Bots handle everything from claims processing to employee onboarding.',
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
    id: 'aramco-ai-training',
    title: 'Enterprise AI & Cyber-Threat Training Programme',
    client: 'Saudi Aramco',
    category: 'AI Training',
    categoryColor: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    description:
      'Delivered a comprehensive training programme on IoT infrastructure, applied AI, and DeepFake threat awareness to 1,200+ engineers and security professionals across Aramco facilities.',
    metrics: [
      { value: '1,200+', label: 'Staff Trained' },
      { value: '94%',    label: 'Competency Score' },
      { value: '3',      label: 'Technology Tracks' },
    ],
    gradientFrom: 'rgba(139,92,246,0.25)',
    gradientTo:   'rgba(59,130,246,0.10)',
    accentColor:  '#8b5cf6',
    iconLabel:    'AI',
    fullDescription:
      'Skilpex partnered with Saudi Aramco — one of the world\'s largest energy companies — to design and deliver a multi-track technology training programme across its operational and corporate divisions. The programme covered Industrial IoT sensor networks, practical AI applications in the energy sector, and critical DeepFake threat-awareness training to protect executives and operational integrity.',
    challenge:
      'As Aramco accelerated its digital transformation strategy, a widening skills gap emerged across engineering, IT, and security teams. Staff lacked hands-on exposure to modern AI tooling and were largely unaware of the growing risk of synthetic media attacks — including voice cloning and video DeepFakes — used in corporate fraud and social engineering campaigns.',
    solution:
      'We designed a modular, instructor-led curriculum split into three specialist tracks: (1) Industrial IoT — covering sensor deployment, edge computing, and real-time telemetry for oil & gas infrastructure; (2) Applied AI — including machine learning fundamentals, predictive maintenance models, and AI-driven anomaly detection; (3) DeepFake & Synthetic Media Awareness — teaching staff to identify AI-generated audio and video content, understand attack vectors, and apply verification protocols. Training was delivered on-site across multiple Aramco locations with hands-on lab environments.',
    results: [
      'Trained 1,200+ engineers, analysts, and security professionals',
      'Achieved 94% average competency score across all tracks',
      'Reduced reported social-engineering incidents by 60% within 6 months',
      'Established an internal IoT Centre of Excellence at Aramco HQ',
      'Participants built live predictive maintenance dashboards during training',
      'Programme adopted as part of Aramco\'s standard onboarding for technical roles',
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

// ── Modal ────────────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-20"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="bg-card border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        {/* Close button — outside scroll area, always visible */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 z-20 bg-background/60 hover:bg-background/90 backdrop-blur-sm border border-border/40 shadow-md"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </Button>

        {/* Scrollable content — min-h-0 required for overflow to work inside flex */}
        <div className="flex-1 min-h-0 overflow-y-auto rounded-2xl">

        {/* Hero banner */}
        <div
          className="h-52 relative flex items-end overflow-hidden rounded-t-2xl"
          style={{
            background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
          }}
          aria-hidden="true"
        >
          {/* Dot mesh */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle, ${project.accentColor} 1px, transparent 1px)`,
              backgroundSize: '22px 22px',
            }}
          />
          {/* Category icon */}
          <div className="absolute top-5 left-6">
            <span
              className="text-3xl font-black opacity-30"
              style={{ color: project.accentColor }}
            >
              {project.iconLabel}
            </span>
          </div>
          {/* Title */}
          <div className="relative z-10 p-6">
            <Badge variant="outline" className={`mb-2 ${project.categoryColor}`}>
              {project.category}
            </Badge>
            <h2
              id="project-modal-title"
              className="text-2xl font-bold text-foreground"
            >
              {project.title}
            </h2>
            <p className="text-muted-foreground text-sm mt-0.5">{project.client}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-7">

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="text-center p-3 rounded-xl border border-border bg-secondary/40"
              >
                <p className="text-2xl font-bold tabular-nums" style={{ color: project.accentColor }}>
                  {m.value}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Overview */}
          <section>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-3">Overview</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">{project.fullDescription}</p>
          </section>

          {/* Challenge & Solution */}
          <div className="grid md:grid-cols-2 gap-4">
            <section className="bg-secondary/50 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-3">The Challenge</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{project.challenge}</p>
            </section>
            <section className="bg-secondary/50 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-3">Our Solution</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{project.solution}</p>
            </section>
          </div>

          {/* Results */}
          <section>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-3">Key Results</h3>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {project.results.map((result, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: project.accentColor }}
                    aria-hidden="true"
                  />
                  <span className="text-sm text-foreground">{result}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Technologies */}
          <section>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-3">Technologies Used</h3>
            <ul className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li key={tech}>
                  <Badge variant="outline" className="bg-secondary/60">{tech}</Badge>
                </li>
              ))}
            </ul>
          </section>

          {/* Video placeholder */}
          <section>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
              <Play className="w-4 h-4 text-primary" aria-hidden="true" />
              Project Video
            </h3>
            <div
              className="aspect-video rounded-xl flex items-center justify-center border border-border"
              style={{ background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})` }}
            >
              <div className="text-center">
                <div
                  className="w-14 h-14 rounded-full bg-background/40 backdrop-blur-sm flex items-center justify-center mx-auto mb-3 border border-white/10"
                  aria-hidden="true"
                >
                  <Play className="w-6 h-6 text-white ml-0.5" />
                </div>
                <p className="text-xs text-white/60">Video presentation coming soon</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="flex gap-3 pt-2 border-t border-border">
            <Button
              className="flex-1 gap-2"
              style={{ background: `linear-gradient(135deg, ${project.accentColor}, ${project.accentColor}cc)` }}
            >
              Request Similar Solution
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Button>
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>
        </div>
        </div>{/* end flex-1 scrollable */}
      </div>
    </div>
  )
}

// ── Main section ─────────────────────────────────────────────────────────────
export function ProjectsSection() {
  const { t } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [fetchedProjects, setFetchedProjects] = useState<Project[]>([])
  
  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await client.fetch(
          `*[_type == "project"] | order(_createdAt asc)`
        )
        if (data && data.length > 0) {
          const formatted = data.map((p: any) => ({
            ...p,
            // Map stored value ('iiot') → display label ('IIoT')
            category: CATEGORY_LABELS[p.category] ?? p.category,
            thumbnail: p.thumbnail ? urlForImage(p.thumbnail)?.url() : '',
          }))
          setFetchedProjects(formatted)
        }
      } catch (e) {
        console.error('Sanity fetch error:', e)
      }
    }
    fetchProjects()
  }, [])

  // Sanity is source of truth; defaultProjects are only shown if Sanity is unreachable
  const currentProjects = fetchedProjects.length > 0 ? fetchedProjects : defaultProjects

  return (
    <>
      <section id="projects" className="py-24 relative overflow-hidden bg-background" aria-labelledby="projects-title">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary tracking-widest uppercase mb-4 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
              Our Work
            </span>
            <h2
              id="projects-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance"
            >
              {t.projects.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              {t.projects.subtitle}
            </p>
          </header>

          <div className="grid lg:grid-cols-3 gap-6" role="list" aria-label="Featured projects">
            {currentProjects.map((project, i) => (
              <article
                key={project.id}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/40 transition-all duration-500 cursor-pointer flex flex-col"
                onClick={() => setSelectedProject(project)}
                role="listitem"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedProject(project)
                  }
                }}
                aria-label={`View details for ${project.title}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {/* Card thumbnail */}
                <div
                  className="h-44 relative flex items-center justify-center overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
                  }}
                  aria-hidden="true"
                >
                  {/* Dot mesh */}
                  <div
                    className="absolute inset-0 opacity-25"
                    style={{
                      backgroundImage: `radial-gradient(circle, ${project.accentColor} 1px, transparent 1px)`,
                      backgroundSize: '20px 20px',
                    }}
                  />
                  {/* Big label */}
                  <span
                    className="text-6xl font-black opacity-20 select-none"
                    style={{ color: project.accentColor }}
                  >
                    {project.iconLabel}
                  </span>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-background/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span
                      className="font-semibold flex items-center gap-2 text-sm"
                      style={{ color: project.accentColor }}
                    >
                      View Case Study <ExternalLink className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6 flex flex-col flex-1">
                  <Badge variant="outline" className={`mb-3 w-fit ${project.categoryColor}`}>
                    {project.category}
                  </Badge>

                  <h3 className="text-lg font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">{project.client}</p>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed flex-1">{project.description}</p>

                  {/* Metrics row */}
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {project.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="text-center p-2 rounded-lg bg-secondary/60 border border-border"
                      >
                        <p
                          className="text-sm font-bold tabular-nums"
                          style={{ color: project.accentColor }}
                        >
                          {m.value}
                        </p>
                        <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-200 mt-auto">
                    {t.projects.viewCase}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  )
}
