'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, Tag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/language-context'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { cn } from '@/lib/utils'

type BlogPost = {
  _id: string
  title: string
  slug: string
  category: string
  categoryColor: string
  excerpt: string
  coverImage?: any
  author: string
  publishedAt: string
  readTime: string
  accentFrom: string
  accentTo: string
  featured: boolean
}

const BLOG_QUERY = `*[_type == "blogPost"] | order(featured desc, publishedAt desc) [0...6] {
  _id,
  title,
  "slug": slug.current,
  category,
  categoryColor,
  excerpt,
  coverImage,
  author,
  publishedAt,
  readTime,
  accentFrom,
  accentTo,
  featured
}`

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-border/40 overflow-hidden animate-pulse">
      <div className="h-1 bg-muted w-full" />
      <div className="p-6 flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="h-5 w-28 bg-muted rounded-full" />
          <div className="h-5 w-20 bg-muted rounded-full" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-4/5" />
          <div className="h-4 bg-muted rounded w-3/5" />
        </div>
        <div className="h-16 bg-muted rounded" />
        <div className="h-px bg-border/40" />
        <div className="flex justify-between">
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-4 w-20 bg-muted rounded" />
        </div>
      </div>
    </div>
  )
}

export function BlogSection() {
  const { t } = useLanguage()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    client
      .fetch<BlogPost[]>(BLOG_QUERY)
      .then((data) => setPosts(data ?? []))
      .finally(() => setLoading(false))
  }, [])

  const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))]
  const filtered =
    activeCategory === 'All' ? posts : posts.filter((p) => p.category === activeCategory)

  return (
    <section id="blog" className="py-20 sm:py-32 relative overflow-hidden">
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
        {!loading && posts.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
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
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
            : filtered.map((post) => (
                <article
                  key={post._id}
                  className="group relative flex flex-col rounded-2xl border border-border/60 overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1"
                  style={{
                    background: `linear-gradient(135deg, ${post.accentFrom}, ${post.accentTo}), oklch(0.16 0.02 240)`,
                  }}
                >
                  {/* Accent bar */}
                  <div
                    className="h-1 w-full shrink-0"
                    style={{
                      background: `linear-gradient(90deg, ${post.accentFrom}, ${post.accentTo})`,
                    }}
                    aria-hidden="true"
                  />

                  {/* Cover image */}
                  {post.coverImage && (
                    <div className="relative h-44 w-full overflow-hidden">
                      <Image
                        src={urlForImage(post.coverImage).width(600).height(300).url()}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="flex flex-col flex-1 p-6 gap-4">
                    <div className="flex items-center justify-between gap-2">
                      <Badge
                        variant="outline"
                        className={cn('text-xs', post.categoryColor)}
                      >
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
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border/40">
                      <div>
                        <p className="text-xs font-medium text-foreground">{post.author}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(post.publishedAt)}</p>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-xs text-primary hover:text-primary group-hover:gap-2 transition-all duration-200 px-2"
                          aria-label={`${t.blog.readMore}: ${post.title}`}
                        >
                          {t.blog.readMore}
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
        </div>

        {/* Empty state */}
        {!loading && posts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">Articles coming soon.</p>
          </div>
        )}

        {/* CTA */}
        {!loading && posts.length > 0 && (
          <div className="text-center mt-12">
            <Link href="/blog">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-primary/30 hover:bg-primary/10"
              >
                {t.blog.viewAll}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
