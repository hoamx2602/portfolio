'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { PortableText, type PortableTextComponents } from 'next-sanity'
import { ArrowLeft, Calendar, ChevronRight, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LanguageProvider } from '@/components/language-context'
import { FilterProvider } from '@/components/filter-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { client } from '@/sanity/lib/client'

type LegalPage = {
  title:       string
  slug:        string
  lastUpdated: string
  summary?:    string
  body:        any[]
}

const LEGAL_QUERY = `*[_type == "legalPage" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  lastUpdated,
  summary,
  body
}`

const components: PortableTextComponents = {
  block: {
    normal:     ({ children }) => <p className="mb-5 text-muted-foreground leading-relaxed">{children}</p>,
    h2:         ({ children }) => <h2 className="text-xl font-bold text-foreground mt-10 mb-3 pb-2 border-b border-border/40">{children}</h2>,
    h3:         ({ children }) => <h3 className="text-lg font-semibold text-foreground mt-7 mb-2">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary/40 pl-4 py-1 my-5 italic text-muted-foreground bg-primary/5 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-5 space-y-1.5 list-disc list-outside pl-5 text-muted-foreground">{children}</ul>,
    number: ({ children }) => <ol className="mb-5 space-y-1.5 list-decimal list-outside pl-5 text-muted-foreground">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong:    ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em:        ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
    code:      ({ children }) => <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary">{children}</code>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : '_self'}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
      >
        {children}
      </a>
    ),
  },
}

function PageSkeleton() {
  return (
    <div className="animate-pulse space-y-4 max-w-3xl mx-auto">
      <div className="h-4 w-40 bg-muted rounded" />
      <div className="h-10 bg-muted rounded w-2/3 mt-6" />
      <div className="h-4 w-32 bg-muted rounded" />
      <div className="h-px bg-border my-6" />
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-4 bg-muted rounded" style={{ width: `${70 + Math.random() * 25}%` }} />
      ))}
    </div>
  )
}

function LegalContent() {
  const params = useParams()
  const slug   = params?.slug as string

  const [page, setPage]       = useState<LegalPage | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    client
      .fetch<LegalPage>(LEGAL_QUERY, { slug })
      .then((data) => {
        if (!data) setNotFound(true)
        else setPage(data)
      })
      .finally(() => setLoading(false))
  }, [slug])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

          {loading ? (
            <div className="pt-8"><PageSkeleton /></div>
          ) : notFound ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
              <FileText className="w-12 h-12 text-muted-foreground/40" />
              <p className="text-muted-foreground text-lg">Page not found.</p>
              <Link href="/"><Button variant="outline">← Back to Home</Button></Link>
            </div>
          ) : page ? (
            <>
              {/* Breadcrumb */}
              <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
                <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-foreground">{page.title}</span>
              </nav>

              {/* Header */}
              <header className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    Legal
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 leading-tight">
                  {page.title}
                </h1>

                {page.summary && (
                  <p className="text-muted-foreground text-base leading-relaxed mb-4">
                    {page.summary}
                  </p>
                )}

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  Last updated:{' '}
                  {new Date(page.lastUpdated).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </div>
              </header>

              <div className="h-px bg-border/40 mb-10" />

              {/* Body */}
              <article>
                {page.body?.length > 0 ? (
                  <PortableText value={page.body} components={components} />
                ) : (
                  <p className="text-muted-foreground italic">Content coming soon.</p>
                )}
              </article>

              {/* Back */}
              <div className="mt-16 pt-8 border-t border-border/40 flex justify-center">
                <Link href="/">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function LegalPage() {
  return (
    <LanguageProvider>
      <FilterProvider>
        <LegalContent />
      </FilterProvider>
    </LanguageProvider>
  )
}
