'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Clock, Users, ArrowRight, X,
  CheckCircle2, TrendingUp, ShieldCheck, BarChart3, Zap,
  Factory, Wifi, LucideIcon
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

type OverviewData = {
  description: string
  noCodingNote?: string
  calloutTitle?: string
  benefits: {
    icon: LucideIcon
    title: string
    stat: string
    desc: string
  }[]
  useCases: {
    icon: LucideIcon
    title: string
    outcome: string
  }[]
  topics: string[]
  gallery?: {
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
      thumbnail: string
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
      thumbnail: string
      contentType: 'overview'
      overview: OverviewData
    }

// ── Data ─────────────────────────────────────────────────────────────────────

const iiotOverview: OverviewData = {
  description:
    'A practical, business-focused programme that equips operational managers, engineers, and decision-makers with the knowledge to plan, deploy, and govern Industrial IoT solutions — without writing a single line of code.',
  noCodingNote:
    'Designed for operations leaders, plant managers, and business stakeholders. You will work with real industrial dashboards and configure live sensor streams hands-on — all through visual, no-code tools.',
  calloutTitle: 'No Coding Required',
  benefits: [
    { icon: TrendingUp, title: 'Reduce Operational Costs', stat: 'Up to 25% savings', desc: 'Identify inefficiencies and automate data collection to cut labour and maintenance spend.' },
    { icon: ShieldCheck, title: 'Prevent Costly Downtime', stat: 'Up to 40% fewer failures', desc: 'Use real-time sensor data and predictive alerts to act before equipment breaks down.' },
    { icon: BarChart3, title: 'Data-Driven Decisions', stat: 'Live operational dashboards', desc: 'Replace gut-feel with real-time visibility across every machine, line, and facility.' },
    { icon: Zap, title: 'Accelerate Digital Transformation', stat: 'Industry 4.0 readiness', desc: 'Build internal capability to lead IIoT projects and evaluate vendor proposals confidently.' },
  ],
  useCases: [
    { icon: Factory, title: 'Smart Manufacturing', outcome: 'Reduced scrap rate by 18% through real-time quality monitoring on the production line.' },
    { icon: Wifi, title: 'Connected Asset Tracking', outcome: 'Achieved 99.2% asset visibility across 3 sites — with zero IT dependency.' },
    { icon: TrendingUp, title: 'Predictive Maintenance', outcome: 'Cut unplanned downtime by 35% within 6 months of deployment.' },
    { icon: BarChart3, title: 'Energy Monitoring', outcome: 'Identified £120k/yr in energy waste through automated consumption tracking.' },
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
    thumbnail: '/thumb-python.png',
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
    thumbnail: '/thumb-ml.png',
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
    thumbnail: '/thumb-data-analytics.png',
    contentType: 'days',
    days: [
      { day: 1, title: 'Advanced Pandas',               topics: ['MultiIndex', 'Time Series Analysis', 'Data Aggregation'] },
      { day: 2, title: 'Data Visualization',            topics: ['Seaborn', 'Plotly Interactive Charts', 'Dashboard Creation'] },
      { day: 3, title: 'Statistical Analysis',          topics: ['Hypothesis Testing', 'A/B Testing', 'Correlation Analysis'] },
      { day: 4, title: 'Big Data Processing',           topics: ['PySpark Basics', 'Distributed Computing', 'Data Pipelines'] },
      { day: 5, title: 'Real-World Projects',           topics: ['End-to-End Analytics Project', 'Business Intelligence', 'Reporting Automation'] },
    ],
  },
  {
    id: 'data-management-ai',
    category: 'ai',
    title: 'Data Management for AI Readiness',
    duration: '3 days',
    level: 'Intermediate',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    thumbnail: '/thumb-data-mgmt.png',
    contentType: 'overview',
    overview: {
      description: 'A strategic deep dive into organizing, structuring, and securing enterprise data to unlock the full potential of artificial intelligence. Master the foundations required to feed high-quality data into complex ML models and LLMs.',
      benefits: [
        { icon: TrendingUp, title: 'Accelerate AI Adoption', stat: 'Faster deployment', desc: 'Cut down data preparation time by building scalable, automated ETL pipelines.' },
        { icon: ShieldCheck, title: 'Ensure Compliance', stat: 'GDPR ready', desc: 'Implement robust data governance and anonymization to protect sensitive information.' },
        { icon: BarChart3, title: 'Improve Model Accuracy', stat: 'Higher precision', desc: 'Feed your AI high-quality, normalized data to eliminate hallucinations and bias.' },
        { icon: Zap, title: 'Break Data Silos', stat: 'Unified architecture', desc: 'Consolidate disparate data sources into a cohesive data lake or warehouse strategy.' },
      ],
      useCases: [
        { icon: Factory, title: 'Enterprise Data Lake', outcome: 'Centralized 5PB of scattered data into a single source of truth for AI training.' },
        { icon: Wifi, title: 'Real-Time Streaming', outcome: 'Enabled sub-second anomaly detection by implementing Kafka data pipelines.' },
        { icon: TrendingUp, title: 'Automated Cleaning', outcome: 'Reduced manual data wrangling hours by 80% using automated quality checks.' },
        { icon: ShieldCheck, title: 'Secure PII Handling', outcome: 'Achieved 100% compliance in healthcare data anonymization for ML.' },
      ],
      topics: [
        'Data Architecture: Lakes vs Warehouses',
        'Cloud Infrastructure & Storage',
        'Data Governance & Compliance (GDPR)',
        'ETL/ELT Processes & Orchestration',
        'Real-time Data Streaming',
        'Data Cleaning & Validation',
        'Feature Engineering for AI',
        'Privacy & Anonymization Techniques',
      ],
    }
  },
  {
    id: 'responsible-llm-integration',
    category: 'ai',
    title: 'Responsible LLM Enterprise Integration',
    duration: '2 days',
    level: 'Advanced',
    color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    thumbnail: '/thumb-llm.png',
    contentType: 'overview',
    overview: {
      description: 'Equip your technical leadership with the frameworks needed to safely deploy Large Language Models in production. Focus on mitigating risks, preventing data leakage, and ensuring ethical AI alignment.',
      benefits: [
        { icon: ShieldCheck, title: 'Mitigate Hallucinations', stat: '99% factual accuracy', desc: 'Implement RAG and grounding techniques to ensure LLM outputs are reliable.' },
        { icon: Factory, title: 'Prevent Data Leaks', stat: 'Zero exposure', desc: 'Design secure boundaries to prevent sensitive corporate data from training public models.' },
        { icon: Zap, title: 'Defend Against Attacks', stat: 'Robust security', desc: 'Secure your AI applications against prompt injections and jailbreaks.' },
        { icon: TrendingUp, title: 'Ensure Ethical AI', stat: 'Bias-free operations', desc: 'Establish guidelines and automated checks to prevent discriminatory outputs.' },
      ],
      useCases: [
        { icon: ShieldCheck, title: 'Secure Copilot', outcome: 'Deployed internal coding assistant with strict IP protection boundaries.' },
        { icon: Factory, title: 'Enterprise RAG', outcome: 'Built a hallucination-free document QA system over 100,000 internal PDFs.' },
        { icon: Wifi, title: 'Red Teaming', outcome: 'Identified and patched 15 critical vulnerabilities in customer-facing chatbots.' },
        { icon: BarChart3, title: 'Bias Auditing', outcome: 'Implemented automated fairness checks in an AI recruitment screening tool.' },
      ],
      topics: [
        'Evaluating Foundation Models',
        'Hallucination Mitigation Strategies',
        'Security & Data Leakage Risks',
        'Retrieval-Augmented Generation (RAG)',
        'Prompt Injection Defense',
        'Ethical AI Guidelines & Bias',
        'Model Auditing & Red Teaming',
        'Compliance in Generative AI',
      ],
    }
  },
  {
    id: 'masterful-prompt-engineering',
    category: 'ai',
    title: 'Masterful Prompt Engineering',
    duration: '2 days',
    level: 'All Levels',
    color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    thumbnail: '/thumb-prompt.png',
    contentType: 'overview',
    overview: {
      description: 'Transform how your team communicates with AI. Learn advanced techniques to extract maximum value from foundation models through precise, structured, and iterative prompting methodologies.',
      benefits: [
        { icon: Zap, title: 'Boost Productivity', stat: '3x faster outputs', desc: 'Reduce the time spent re-prompting by getting it right the first time.' },
        { icon: BarChart3, title: 'Enhance Output Quality', stat: 'Higher relevance', desc: 'Use advanced framing and constraints to generate highly specific, usable results.' },
        { icon: ShieldCheck, title: 'Standardize Prompts', stat: 'Consistent AI', desc: 'Develop a library of standardized system prompts for your entire organization.' },
        { icon: Factory, title: 'Automate Workflows', stat: 'Agentic tasks', desc: 'Learn to string multiple prompts together to solve complex, multi-step problems.' },
      ],
      useCases: [
        { icon: TrendingUp, title: 'Content Generation', outcome: 'Automated high-quality marketing copy generation with strict brand voice constraints.' },
        { icon: Zap, title: 'Data Extraction', outcome: 'Extracted structured JSON data from messy, unstructured text with 98% accuracy.' },
        { icon: Wifi, title: 'Code Refactoring', outcome: 'Used Chain-of-Thought to rewrite legacy codebases efficiently.' },
        { icon: Factory, title: 'Customer Support', outcome: 'Designed robust system prompts that handle angry customers gracefully.' },
      ],
      topics: [
        'Zero-Shot & Few-Shot Prompting',
        'Persona Assignment & Roleplay',
        'Context Framing & Constraints',
        'Chain-of-Thought (CoT) Reasoning',
        'ReAct Framework (Reason + Act)',
        'Iterative Refinement & Prompt Chaining',
        'System Prompts & Instruction Tuning',
        'Evaluating Prompt Effectiveness',
      ],
    }
  },
  {
    id: 'ai-native-vibe-coding',
    category: 'ai',
    title: 'AI-Native Vibe Coding & Prototyping',
    duration: '3 days',
    level: 'Intermediate',
    color: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
    thumbnail: '/thumb-vibe-coding.png',
    contentType: 'overview',
    overview: {
      description: 'Embrace the future of software development where plain English is your primary programming language. Learn to build, iterate, and deploy functional applications at unprecedented speeds using AI-first IDEs and agentic workflows.',
      noCodingNote: 'While this course covers software concepts, the focus is on directing AI agents through natural language ("vibe coding") rather than writing syntax manually.',
      calloutTitle: 'Natural Language Coding',
      benefits: [
        { icon: Zap, title: 'Rapid Prototyping', stat: '10x faster MVP', desc: 'Go from idea to functional prototype in hours instead of weeks.' },
        { icon: Factory, title: 'Focus on Architecture', stat: 'Semantic logic', desc: 'Shift your focus from writing boilerplate syntax to designing high-level system logic.' },
        { icon: ShieldCheck, title: 'Automated Debugging', stat: 'Fewer blockers', desc: 'Leverage AI agents to instantly identify, explain, and fix complex bugs.' },
        { icon: TrendingUp, title: 'Empower Non-Coders', stat: 'Accessible dev', desc: 'Enable product managers and designers to build functional tools independently.' },
      ],
      useCases: [
        { icon: Wifi, title: 'Internal Tooling', outcome: 'Built a complete CRM dashboard from scratch in 2 days using Cursor.' },
        { icon: Factory, title: 'Legacy Modernization', outcome: 'Migrated a React app to Next.js by delegating repetitive tasks to an AI agent.' },
        { icon: Zap, title: 'UI/UX Iteration', outcome: 'Iterated through 5 different design systems in one afternoon simply by describing the "vibe".' },
        { icon: BarChart3, title: 'Test Automation', outcome: 'Generated 100% unit test coverage for an entire module in minutes.' },
      ],
      topics: [
        'The "Vibe Coding" Paradigm Shift',
        'Mastering AI IDEs (Cursor, Windsurf)',
        'Prompt-Driven Architecture Design',
        'Component & Scaffold Generation',
        'Managing AI Context & Codebase Indexing',
        'Agentic Development Workflows',
        'AI-Assisted Bug Fixing & Refactoring',
        'UI/UX Iteration by Vibe',
      ],
    }
  },
  // ── IIoT — overview format ──
  {
    id: 'iiot-fundamentals',
    category: 'iiot',
    title: 'IIoT Implementation',
    duration: '5 days',
    level: 'Intermediate',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    thumbnail: '/iiot-edge-architecture.png',
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
    thumbnail: '/thumb-rpa.png',
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

// ── Renderers ────────────────────────────────────────────────────────────────

function OverviewContent({ overview }: { overview: OverviewData }) {
  return (
    <div className="px-6 pb-8 pt-6 space-y-8">

      {/* Description + optional no-coding callout */}
      <div className={cn("grid gap-5", overview.noCodingNote ? "md:grid-cols-2" : "md:grid-cols-1")}>
        <p className="text-muted-foreground leading-relaxed text-pretty max-w-4xl">
          {overview.description}
        </p>
        {overview.noCodingNote && (
          <div
            className="flex items-start gap-3 p-4 rounded-xl border border-emerald-500/25"
            style={{ background: 'rgba(52,211,153,0.06)' }}
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">{overview.calloutTitle || 'No Coding Required'}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{overview.noCodingNote}</p>
            </div>
          </div>
        )}
      </div>

      {/* Business impact */}
      <div>
        <h4 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-4">Business Impact</h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {overview.benefits.map((b) => (
            <div
              key={b.title}
              className="group p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"
                style={{ background: 'radial-gradient(circle at 30% 20%, var(--tw-gradient-stops))' }}
                aria-hidden="true"
              />
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                <b.icon className="w-4 h-4 text-primary" />
              </div>
              <p className="text-xs font-bold text-primary mb-1">{b.stat}</p>
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
              <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
              {topic}
            </li>
          ))}
        </ul>
      </div>

      {/* Photo gallery (optional) */}
      {overview.gallery && (
        <div>
          <h4 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-4">Programme Gallery</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {overview.gallery.map((item) => (
              <div
                key={item.src}
                className="group relative aspect-video rounded-xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-300"
              >
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                  <span className="text-xs text-white font-medium leading-tight">{item.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="flex justify-end pt-4 border-t border-border mt-8">
        <Button className="gap-2 px-8" style={{ background: 'linear-gradient(135deg, oklch(0.60 0.14 165), oklch(0.52 0.13 175))' }}>
          Enrol Now
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}

function DaysContent({ days }: { days: ModuleDay[] }) {
  return (
    <div className="px-6 pb-6 pt-6">
      <div className="grid gap-4 mb-8">
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
                    <span key={topic} className="px-2 py-1 text-xs bg-background rounded-md text-muted-foreground border border-border">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end pt-4 border-t border-border mt-8">
        <Button className="gap-2 px-8">
          Enroll Now
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}

// ── Modal ────────────────────────────────────────────────────────────────────

function TrainingModal({ module, onClose }: { module: TrainingModule; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-card border border-border rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        {/* Header Banner */}
        <div className="relative h-48 sm:h-64 shrink-0 rounded-t-2xl overflow-hidden border-b border-border">
          <Image
            src={module.thumbnail}
            alt={module.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-background/40 hover:bg-background/70 backdrop-blur-md"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-3 flex-wrap mb-3">
              <Badge variant="outline" className={`bg-background/50 backdrop-blur-sm ${module.color}`}>
                {module.level}
              </Badge>
              {module.contentType === 'overview' && module.overview.noCodingNote && (
                <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 backdrop-blur-sm">
                  {module.overview.calloutTitle || 'No Coding Required'}
                </Badge>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              {module.title}
            </h2>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{module.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>15–20 participants per class</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="flex-1 overflow-y-auto">
          {module.contentType === 'overview' ? (
            <OverviewContent overview={module.overview} />
          ) : (
            <DaysContent days={module.days} />
          )}
        </div>
      </div>
    </div>
  )
}

// ── Main section ─────────────────────────────────────────────────────────────

export function TrainingSection({ isFullPage = false }: { isFullPage?: boolean }) {
  const { t } = useLanguage()
  const { activeFilter, setActiveFilter } = useFilter()
  const [selectedModule, setSelectedModule] = useState<TrainingModule | null>(null)

  const allFilteredModules = activeFilter === 'all'
    ? trainingModules
    : trainingModules.filter(m => m.category === activeFilter)
    
  const filteredModules = isFullPage 
    ? allFilteredModules 
    : allFilteredModules.slice(0, 6)

  const hasMore = !isFullPage && allFilteredModules.length > 6

  const filterButtons: { id: ServiceCategory; label: string }[] = [
    { id: 'all',  label: 'All Programs' },
    { id: 'ai',   label: 'Artificial Intelligence' },
    { id: 'iiot', label: 'Industrial IoT' },
    { id: 'rpa',  label: 'RPA' },
  ]

  return (
    <>
      <section id="training" className="py-24 bg-secondary/30 relative overflow-hidden" aria-labelledby="training-title">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" aria-hidden="true" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary tracking-widest uppercase mb-4 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
              Expert-led
            </span>
            <h2 id="training-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
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
                className="min-w-[140px] transition-all duration-300"
                aria-pressed={activeFilter === filter.id}
              >
                {filter.label}
              </Button>
            ))}
          </nav>

          {/* Training Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Training modules">
            {filteredModules.map((module) => (
              <article
                key={module.id}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-500 cursor-pointer flex flex-col"
                onClick={() => setSelectedModule(module)}
                role="listitem"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedModule(module)
                  }
                }}
              >
                {/* Card Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden border-b border-border bg-muted/20">
                  <Image
                    src={module.thumbnail}
                    alt={module.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80" />
                  
                  {/* Badges Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <Badge variant="outline" className={`bg-background/80 backdrop-blur-sm ${module.color}`}>
                      {module.level}
                    </Badge>
                    {module.contentType === 'overview' && module.overview.noCodingNote && (
                      <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 backdrop-blur-sm">
                        {module.overview.calloutTitle || 'No Coding Required'}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {module.title}
                  </h3>
                  
                  <div className="flex items-center gap-5 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" aria-hidden="true" />
                      <span>{module.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" aria-hidden="true" />
                      <span>15–20 pax</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary group-hover:underline decoration-primary/50 underline-offset-4">
                      View Syllabus
                    </span>
                    <ArrowRight className="w-4 h-4 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {(activeFilter !== 'all' || hasMore) && !isFullPage && (
            <div className="text-center mt-12">
              <Link href="/training">
                <Button
                  variant="ghost"
                  size="lg"
                  className="gap-2"
                >
                  View All Programs
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedModule && (
        <TrainingModal
          module={selectedModule}
          onClose={() => setSelectedModule(null)}
        />
      )}
    </>
  )
}
