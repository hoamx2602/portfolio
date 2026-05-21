'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Clock, Users, ArrowRight, ChevronDown, ChevronUp,
  CheckCircle2, TrendingUp, ShieldCheck, BarChart3, Zap,
  Factory, Wifi,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/components/language-context'
import { useFilter, ServiceCategory } from '@/components/filter-context'
import { cn } from '@/lib/utils'

// ── Types ────────────────────────────────────────────────────────────────────

type ModuleDay = {
  day: number
  title: string
  topics: string[]
}

type IIoTOverview = {
  description: string
  noCodingNote: string
  benefits: {
    icon: typeof TrendingUp
    title: string
    stat: string
    desc: string
  }[]
  useCases: {
    icon: typeof Factory
    title: string
    outcome: string
  }[]
  topics: string[]
  gallery: {
    src: string
    caption: string
  }[]
}

type TrainingModule =
  | {
      id: string
      category: ServiceCategory
      title: string
      duration: string
      level: string
      color: string
      contentType: 'days'
      days: ModuleDay[]
    }
  | {
      id: string
      category: ServiceCategory
      title: string
      duration: string
      level: string
      color: string
      contentType: 'overview'
      overview: IIoTOverview
    }

// ── Data ─────────────────────────────────────────────────────────────────────

const iiotOverview: IIoTOverview = {
  description:
    'A practical, business-focused programme that equips operational managers, engineers, and decision-makers with the knowledge to plan, deploy, and govern Industrial IoT solutions — without writing a single line of code.',
  noCodingNote:
    'Designed for operations leaders, plant managers, and business stakeholders. You will work with real industrial dashboards and configure live sensor streams hands-on — all through visual, no-code tools.',
  benefits: [
    {
      icon: TrendingUp,
      title: 'Reduce Operational Costs',
      stat: 'Up to 25% savings',
      desc: 'Identify inefficiencies and automate data collection to cut labour and maintenance spend.',
    },
    {
      icon: ShieldCheck,
      title: 'Prevent Costly Downtime',
      stat: 'Up to 40% fewer failures',
      desc: 'Use real-time sensor data and predictive alerts to act before equipment breaks down.',
    },
    {
      icon: BarChart3,
      title: 'Data-Driven Decisions',
      stat: 'Live operational dashboards',
      desc: 'Replace gut-feel with real-time visibility across every machine, line, and facility.',
    },
    {
      icon: Zap,
      title: 'Accelerate Digital Transformation',
      stat: 'Industry 4.0 readiness',
      desc: 'Build internal capability to lead IIoT projects and evaluate vendor proposals confidently.',
    },
  ],
  useCases: [
    {
      icon: Factory,
      title: 'Smart Manufacturing',
      outcome: 'Reduced scrap rate by 18% through real-time quality monitoring on the production line.',
    },
    {
      icon: Wifi,
      title: 'Connected Asset Tracking',
      outcome: 'Achieved 99.2% asset visibility across 3 sites — with zero IT dependency.',
    },
    {
      icon: TrendingUp,
      title: 'Predictive Maintenance',
      outcome: 'Cut unplanned downtime by 35% within 6 months of deployment.',
    },
    {
      icon: BarChart3,
      title: 'Energy Monitoring',
      outcome: 'Identified £120k/yr in energy waste through automated consumption tracking.',
    },
  ],
  topics: [
    'IIoT architecture & sensor ecosystems',
    'Connecting machines to the cloud (no coding)',
    'Building live operational dashboards',
    'Predictive maintenance fundamentals',
    'Data security & industrial protocols',
    'Evaluating IIoT vendors & platforms',
    'Business case & ROI calculation',
    'Governance, compliance & change management',
  ],
  gallery: [
    { src: '/iiot-sensor-lab.png',             caption: 'Hands-On Sensor Lab' },
    { src: '/iiot-dashboard.png',              caption: 'Live Factory Dashboard' },
    { src: '/iiot-predictive-maintenance.png', caption: 'Predictive Maintenance Analytics' },
    { src: '/iiot-edge-architecture.png',      caption: 'IIoT Architecture Workshop' },
  ],
}

const trainingModules: TrainingModule[] = [
  // ── AI ──
  {
    id: 'python-fundamentals',
    category: 'ai',
    title: 'Python Fundamentals',
    duration: '5 days',
    level: 'Beginner',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    contentType: 'days',
    days: [
      { day: 1, title: 'Python Basics',                 topics: ['Variables & Data Types', 'Control Flow', 'Functions'] },
      { day: 2, title: 'Data Structures',               topics: ['Lists & Tuples', 'Dictionaries', 'Sets'] },
      { day: 3, title: 'Object-Oriented Programming',   topics: ['Classes & Objects', 'Inheritance', 'Polymorphism'] },
      { day: 4, title: 'File Handling & Modules',       topics: ['File I/O', 'Exception Handling', 'Custom Modules'] },
      { day: 5, title: 'Python for Data Science',       topics: ['NumPy Basics', 'Pandas Introduction', 'Data Visualization with Matplotlib'] },
    ],
  },
  {
    id: 'ml-hands-on',
    category: 'ai',
    title: 'ML Hands-On',
    duration: '5 days',
    level: 'Intermediate',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    contentType: 'days',
    days: [
      { day: 1, title: 'ML Fundamentals',               topics: ['Supervised vs Unsupervised', 'Model Evaluation', 'Train/Test Split'] },
      { day: 2, title: 'Regression Techniques',         topics: ['Linear Regression', 'Polynomial Regression', 'Regularization'] },
      { day: 3, title: 'Classification Algorithms',     topics: ['Logistic Regression', 'Decision Trees', 'Random Forest'] },
      { day: 4, title: 'Clustering & Dimensionality',   topics: ['K-Means Clustering', 'PCA', 'Feature Selection'] },
      { day: 5, title: 'Model Deployment',              topics: ['Model Serialization', 'API Development', 'Production Best Practices'] },
    ],
  },
  {
    id: 'advanced-python-analytics',
    category: 'ai',
    title: 'Advanced Python & Data Analytics',
    duration: '5 days',
    level: 'Advanced',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    contentType: 'days',
    days: [
      { day: 1, title: 'Advanced Pandas',               topics: ['MultiIndex', 'Time Series Analysis', 'Data Aggregation'] },
      { day: 2, title: 'Data Visualization',            topics: ['Seaborn', 'Plotly Interactive Charts', 'Dashboard Creation'] },
      { day: 3, title: 'Statistical Analysis',          topics: ['Hypothesis Testing', 'A/B Testing', 'Correlation Analysis'] },
      { day: 4, title: 'Big Data Processing',           topics: ['PySpark Basics', 'Distributed Computing', 'Data Pipelines'] },
      { day: 5, title: 'Real-World Projects',           topics: ['End-to-End Analytics Project', 'Business Intelligence', 'Reporting Automation'] },
    ],
  },
  // ── IIoT — overview format ──
  {
    id: 'iiot-fundamentals',
    category: 'iiot',
    title: 'IIoT Implementation',
    duration: '5 days',
    level: 'Intermediate',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    contentType: 'overview',
    overview: iiotOverview,
  },
  // ── RPA ──
  {
    id: 'rpa-development',
    category: 'rpa',
    title: 'RPA Development',
    duration: '5 days',
    level: 'Intermediate',
    color: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    contentType: 'days',
    days: [
      { day: 1, title: 'RPA Fundamentals',              topics: ['Introduction to RPA', 'Process Assessment', 'Automation Candidates'] },
      { day: 2, title: 'Bot Development Basics',        topics: ['Recording & Playback', 'Variables & Arguments', 'Control Flow'] },
      { day: 3, title: 'Advanced Automation',           topics: ['Excel Automation', 'Web Scraping', 'Email Automation'] },
      { day: 4, title: 'Orchestration & Management',    topics: ['Bot Scheduling', 'Queue Management', 'Error Handling'] },
      { day: 5, title: 'UiPath Studio',                 topics: ['UiPath Environment Setup', 'Building Production Bots', 'Deployment & Monitoring'] },
    ],
  },
]

// ── Overview renderer (IIoT) ─────────────────────────────────────────────────

function OverviewContent({ overview }: { overview: IIoTOverview }) {
  return (
    <div className="px-6 pb-8 pt-2 border-t border-border space-y-8">

      {/* Description + no-coding callout */}
      <div className="grid md:grid-cols-2 gap-5 pt-4">
        <p className="text-muted-foreground leading-relaxed text-pretty">
          {overview.description}
        </p>
        <div
          className="flex items-start gap-3 p-4 rounded-xl border border-emerald-500/25"
          style={{ background: 'rgba(52,211,153,0.06)' }}
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">No coding required</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{overview.noCodingNote}</p>
          </div>
        </div>
      </div>

      {/* Business impact */}
      <div>
        <h4 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-4">Business Impact</h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {overview.benefits.map((b) => (
            <div
              key={b.title}
              className="group p-4 rounded-xl bg-secondary/50 border border-border hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"
                style={{ background: 'radial-gradient(circle at 30% 20%, rgba(52,211,153,0.07) 0%, transparent 70%)' }}
                aria-hidden="true"
              />
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3">
                <b.icon className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-xs font-bold text-emerald-400 mb-1">{b.stat}</p>
              <p className="text-sm font-semibold text-foreground mb-1">{b.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Use cases */}
      <div>
        <h4 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-4">Real-World Use Cases</h4>
        <div className="grid sm:grid-cols-2 gap-3">
          {overview.useCases.map((uc) => (
            <div
              key={uc.title}
              className="flex items-start gap-3 p-4 rounded-xl bg-secondary/40 border border-border hover:border-primary/30 transition-colors duration-300"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <uc.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-0.5">{uc.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{uc.outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Topics covered */}
      <div>
        <h4 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-4">What You&apos;ll Cover</h4>
        <ul className="grid sm:grid-cols-2 gap-2">
          {overview.topics.map((topic) => (
            <li key={topic} className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" aria-hidden="true" />
              {topic}
            </li>
          ))}
        </ul>
      </div>

      {/* Photo gallery */}
      <div>
        <h4 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-4">Programme Gallery</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {overview.gallery.map((item) => (
            <div
              key={item.src}
              className="group relative aspect-video rounded-xl overflow-hidden border border-border hover:border-emerald-500/40 transition-all duration-300"
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              {/* Caption overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                <span className="text-xs text-white font-medium leading-tight">{item.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-end pt-2">
        <Button
          className="gap-2"
          style={{ background: 'linear-gradient(135deg, oklch(0.60 0.14 165), oklch(0.52 0.13 175))' }}
        >
          Enrol Now
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}

// ── Day-by-day renderer ──────────────────────────────────────────────────────

function DaysContent({ days }: { days: ModuleDay[] }) {
  return (
    <div className="px-6 pb-6 pt-2 border-t border-border">
      <div className="grid gap-4">
        {days.map((day) => (
          <div key={day.day} className="bg-secondary/50 rounded-xl p-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-primary">D{day.day}</span>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">{day.title}</h4>
                <div className="flex flex-wrap gap-2">
                  {day.topics.map((topic) => (
                    <span key={topic} className="px-2 py-1 text-xs bg-background rounded-md text-muted-foreground">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <Button className="gap-2">
          Enroll Now
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}

// ── Main section ─────────────────────────────────────────────────────────────

export function TrainingSection() {
  const { t } = useLanguage()
  const { activeFilter, setActiveFilter } = useFilter()
  const [expandedModules, setExpandedModules] = useState<string[]>([])

  const filteredModules = activeFilter === 'all'
    ? trainingModules
    : trainingModules.filter(m => m.category === activeFilter)

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  const filterButtons: { id: ServiceCategory; label: string }[] = [
    { id: 'all',  label: 'All Programs' },
    { id: 'ai',   label: 'Artificial Intelligence' },
    { id: 'iiot', label: 'Industrial IoT' },
    { id: 'rpa',  label: 'RPA' },
  ]

  return (
    <section id="training" className="py-24 bg-secondary/30" aria-labelledby="training-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h2 id="training-title" className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            {t.training.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t.training.subtitle}
          </p>
        </header>

        {/* Filter Buttons */}
        <nav aria-label="Filter training programs" className="flex flex-wrap justify-center gap-3 mb-12" role="group">
          {filterButtons.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? 'default' : 'outline'}
              onClick={() => setActiveFilter(filter.id)}
              className="min-w-[140px]"
              aria-pressed={activeFilter === filter.id}
            >
              {filter.label}
            </Button>
          ))}
        </nav>

        {/* Training Modules */}
        <div className="grid gap-6" role="list" aria-label="Training modules">
          {filteredModules.map((module) => {
            const isExpanded = expandedModules.includes(module.id)

            return (
              <article
                key={module.id}
                className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-colors"
                role="listitem"
              >
                {/* Module Header */}
                <div
                  className="p-6 cursor-pointer flex items-center justify-between"
                  onClick={() => toggleModule(module.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  aria-controls={`module-content-${module.id}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      toggleModule(module.id)
                    }
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-xl font-semibold text-foreground">{module.title}</h3>
                        <Badge variant="outline" className={module.color}>{module.level}</Badge>
                        {module.contentType === 'overview' && (
                          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs">
                            No Coding Required
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" aria-hidden="true" />
                          <span>{module.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4" aria-hidden="true" />
                          <span>15–20 participants</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" aria-label={isExpanded ? 'Collapse module' : 'Expand module'}>
                    {isExpanded
                      ? <ChevronUp className="w-5 h-5" aria-hidden="true" />
                      : <ChevronDown className="w-5 h-5" aria-hidden="true" />
                    }
                  </Button>
                </div>

                {/* Expandable Content */}
                <div
                  id={`module-content-${module.id}`}
                  className={cn(
                    'overflow-hidden transition-all duration-300',
                    isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  )}
                >
                  {module.contentType === 'overview'
                    ? <OverviewContent overview={module.overview} />
                    : <DaysContent days={module.days} />
                  }
                </div>
              </article>
            )
          })}
        </div>

        {activeFilter !== 'all' && (
          <div className="text-center mt-12">
            <Button
              variant="ghost"
              size="lg"
              className="gap-2"
              onClick={() => setActiveFilter('all')}
            >
              {t.training.viewAll}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
