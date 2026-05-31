'use client'

import { useState } from 'react'
import { ArrowRight, Clock, Tag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/language-context'
import { cn } from '@/lib/utils'

type BlogPost = {
  id: string
  category: string
  categoryColor: string
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  accentFrom: string
  accentTo: string
}

const posts: BlogPost[] = [
  {
    id: 'responsible-ai-nhs',
    category: 'Responsible AI',
    categoryColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
    title: 'Why the NHS Must Prioritise Explainable AI Before Scaling Deployments',
    excerpt:
      'As machine learning models enter clinical pathways, transparency and audit trails are no longer optional. We explore the governance frameworks every health trust should have in place.',
    author: 'Bradford AI Team',
    date: '12 May 2025',
    readTime: '7 min read',
    accentFrom: 'rgba(52,211,153,0.25)',
    accentTo: 'rgba(34,211,238,0.08)',
  },
  {
    id: 'iiot-predictive-maintenance',
    category: 'Industrial IoT',
    categoryColor: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20',
    title: 'From Reactive to Predictive: A Practical IIoT Maintenance Playbook',
    excerpt:
      'Unplanned downtime costs manufacturers an average of $260k per hour. This step-by-step guide walks through sensor selection, edge computing, and ML model deployment for condition-based maintenance.',
    author: 'Bradford AI Team',
    date: '28 Apr 2025',
    readTime: '9 min read',
    accentFrom: 'rgba(34,211,238,0.22)',
    accentTo: 'rgba(99,102,241,0.08)',
  },
  {
    id: 'llm-enterprise-governance',
    category: 'AI Strategy',
    categoryColor: 'bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-500/20',
    title: 'Deploying LLMs in Regulated Industries: Governance Before the API Call',
    excerpt:
      'Large language models can unlock enormous productivity — but regulated sectors face data residency, bias, and hallucination risks. Here is how to build guardrails before you write a single prompt.',
    author: 'Bradford AI Team',
    date: '10 Apr 2025',
    readTime: '11 min read',
    accentFrom: 'rgba(139,92,246,0.22)',
    accentTo: 'rgba(236,72,153,0.08)',
  },
  {
    id: 'rpa-roi-public-sector',
    category: 'RPA',
    categoryColor: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
    title: 'Measuring RPA ROI in Local Government: Beyond FTE Savings',
    excerpt:
      'Process automation in councils is often evaluated on headcount reduction alone. We make the case for a broader value framework — compliance, citizen satisfaction, and audit readiness.',
    author: 'Bradford AI Team',
    date: '18 Mar 2025',
    readTime: '6 min read',
    accentFrom: 'rgba(245,158,11,0.22)',
    accentTo: 'rgba(239,68,68,0.08)',
  },
  {
    id: 'data-strategy-sme',
    category: 'Data Strategy',
    categoryColor: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
    title: 'The SME Data Strategy Checklist: 8 Things to Fix Before You Touch AI',
    excerpt:
      'AI initiatives built on poor data foundations are doomed to fail. This checklist helps small and medium enterprises audit data quality, ownership, and pipelines before investing in ML.',
    author: 'Bradford AI Team',
    date: '5 Mar 2025',
    readTime: '5 min read',
    accentFrom: 'rgba(59,130,246,0.22)',
    accentTo: 'rgba(16,185,129,0.08)',
  },
  {
    id: 'ai-act-readiness',
    category: 'AI Governance',
    categoryColor: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20',
    title: 'EU AI Act Readiness: What UK Organisations Still Need to Do in 2025',
    excerpt:
      'Despite Brexit, many UK companies supply EU markets or operate EU subsidiaries — making AI Act compliance unavoidable. Here is a practical readiness roadmap for legal and technical teams.',
    author: 'Bradford AI Team',
    date: '20 Feb 2025',
    readTime: '10 min read',
    accentFrom: 'rgba(244,63,94,0.22)',
    accentTo: 'rgba(251,191,36,0.08)',
  },
]

const allCategories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))]

export function BlogSection() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All' ? posts : posts.filter((p) => p.category === activeCategory)

  return (
    <section id="blog" className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(99,102,241,0.07) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            {t.blog.tagline}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t.blog.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.blog.subtitle}</p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200',
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground border-primary shadow-lg'
                  : 'bg-secondary/60 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <article
              key={post.id}
              className="group relative flex flex-col rounded-2xl border border-border/60 overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1"
              style={{
                background: `linear-gradient(135deg, ${post.accentFrom}, ${post.accentTo}), oklch(0.16 0.02 240)`,
              }}
            >
              {/* Top accent bar */}
              <div
                className="h-1 w-full shrink-0"
                style={{ background: `linear-gradient(90deg, ${post.accentFrom}, ${post.accentTo})` }}
                aria-hidden="true"
              />

              <div className="flex flex-col flex-1 p-6 gap-4">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="outline" className={cn('text-xs', post.categoryColor)}>
                    <Tag className="w-3 h-3 mr-1" aria-hidden="true" />
                    {post.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    {post.readTime}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-base leading-snug mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-3">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">{post.excerpt}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/40">
                  <div>
                    <p className="text-xs font-medium text-foreground">{post.author}</p>
                    <p className="text-xs text-muted-foreground">{post.date}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-xs text-primary hover:text-primary group-hover:gap-2 transition-all duration-200 px-2"
                    aria-label={`${t.blog.readMore}: ${post.title}`}
                  >
                    {t.blog.readMore}
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="gap-2 border-primary/30 hover:bg-primary/10">
            {t.blog.viewAll}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  )
}
