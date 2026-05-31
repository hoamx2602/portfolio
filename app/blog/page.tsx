'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, Tag, Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LanguageProvider } from '@/components/language-context'
import { FilterProvider } from '@/components/filter-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
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
  tags?: string[]
}

const ALL_POSTS_QUERY = `*[_type == "blogPost"] | order(featured desc, publishedAt desc) {
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
  featured,
  tags
}`

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-border/40 overflow-hidden animate-pulse">
      <div className="h-48 bg-muted w-full" />
      <div className="p-6 flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="h-5 w-28 bg-muted rounded-full" />
          <div className="h-5 w-20 bg-muted rounded-full" />
        </div>
        <div className="h-5 bg-muted rounded w-full" />
        <div className="h-5 bg-muted rounded w-3/4" />
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

function BlogListContent() {
  const { t } = useLanguage()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    client
      .fetch<BlogPost[]>(ALL_POSTS_QUERY)
      .then((data) => setPosts(data ?? []))
      .finally(() => setLoading(false))
  }, [])

  const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))]

  const filtered = posts
    .filter((p) => activeCategory === 'All' || p.category === activeCategory)
    .filter(
      (p) =>
        search.trim() === '' ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(search.toLowerCase())
    )

  const featured = filtered.filter((p) => p.featured)
  const rest = filtered.filter((p) => !p.featured)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-20 relative">
        {/* Background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              {t.blog.tagline}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {t.blog.title}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.blog.subtitle}</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-10">
            {/* Category pills */}
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
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

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search articles…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm rounded-full border border-border bg-secondary/40 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              {/* Featured post — full width */}
              {featured.length > 0 && activeCategory === 'All' && search === '' && (
                <div className="mb-8">
                  <FeaturedCard post={featured[0]} readMoreLabel={t.blog.readMore} />
                </div>
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(activeCategory === 'All' && search === '' ? rest : filtered).map((post) => (
                  <PostCard key={post._id} post={post} readMoreLabel={t.blog.readMore} />
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">No articles found.</p>
                  <Button
                    variant="ghost"
                    className="mt-4"
                    onClick={() => {
                      setActiveCategory('All')
                      setSearch('')
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

function FeaturedCard({ post, readMoreLabel }: { post: BlogPost; readMoreLabel: string }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article
        className="relative rounded-2xl border border-border/60 overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-2xl"
        style={{
          background: `linear-gradient(135deg, ${post.accentFrom}, ${post.accentTo}), oklch(0.16 0.02 240)`,
        }}
      >
        <div
          className="h-1 w-full"
          style={{ background: `linear-gradient(90deg, ${post.accentFrom}, ${post.accentTo})` }}
          aria-hidden="true"
        />
        <div className="flex flex-col lg:flex-row">
          {post.coverImage && (
            <div className="relative h-64 lg:h-auto lg:w-2/5 overflow-hidden shrink-0">
              <Image
                src={urlForImage(post.coverImage).width(800).height(500).url()}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
          <div className="flex flex-col justify-center p-8 lg:p-10 gap-4">
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className={cn('text-xs', post.categoryColor)}
              >
                <Tag className="w-3 h-3 mr-1" />
                {post.category}
              </Badge>
              <Badge variant="outline" className="text-xs border-amber-500/30 text-amber-500">
                Featured
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-200 leading-snug">
              {post.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>
            <div className="flex items-center justify-between pt-2 border-t border-border/40">
              <div>
                <p className="text-sm font-medium text-foreground">{post.author}</p>
                <p className="text-xs text-muted-foreground">{formatDate(post.publishedAt)}</p>
              </div>
              <span className="flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all duration-200">
                {readMoreLabel}
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

function PostCard({ post, readMoreLabel }: { post: BlogPost; readMoreLabel: string }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article
        className="relative flex flex-col h-full rounded-2xl border border-border/60 overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1"
        style={{
          background: `linear-gradient(135deg, ${post.accentFrom}, ${post.accentTo}), oklch(0.16 0.02 240)`,
        }}
      >
        <div
          className="h-1 w-full shrink-0"
          style={{ background: `linear-gradient(90deg, ${post.accentFrom}, ${post.accentTo})` }}
          aria-hidden="true"
        />
        {post.coverImage && (
          <div className="relative h-44 w-full overflow-hidden shrink-0">
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
            <Badge variant="outline" className={cn('text-xs', post.categoryColor)}>
              <Tag className="w-3 h-3 mr-1" />
              {post.category}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-foreground text-base leading-snug mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-3">
              {post.title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
              {post.excerpt}
            </p>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border/40">
            <div>
              <p className="text-xs font-medium text-foreground">{post.author}</p>
              <p className="text-xs text-muted-foreground">{formatDate(post.publishedAt)}</p>
            </div>
            <span className="flex items-center gap-1 text-xs text-primary font-medium group-hover:gap-2 transition-all duration-200">
              {readMoreLabel}
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default function BlogPage() {
  return (
    <LanguageProvider>
      <FilterProvider>
        <BlogListContent />
      </FilterProvider>
    </LanguageProvider>
  )
}
