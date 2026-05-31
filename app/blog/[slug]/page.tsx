'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText, type PortableTextComponents } from 'next-sanity'
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Tag,
  Calendar,
  User,
  ChevronRight,
} from 'lucide-react'
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
  body: any[]
}

type AdjacentPost = {
  title: string
  slug: string
}

const POST_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
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
  tags,
  body
}`

const ADJACENT_QUERY = `{
  "prev": *[_type == "blogPost" && publishedAt < $publishedAt] | order(publishedAt desc)[0] {
    title, "slug": slug.current
  },
  "next": *[_type == "blogPost" && publishedAt > $publishedAt] | order(publishedAt asc)[0] {
    title, "slug": slug.current
  }
}`

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-5 text-muted-foreground leading-relaxed text-base">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-foreground mt-10 mb-4 leading-tight">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-foreground mt-8 mb-3 leading-tight">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary/50 pl-5 py-1 my-6 italic text-muted-foreground bg-primary/5 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 space-y-2 list-disc list-outside pl-5 text-muted-foreground">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 space-y-2 list-decimal list-outside pl-5 text-muted-foreground">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary">
        {children}
      </code>
    ),
    underline: ({ children }) => <u>{children}</u>,
    link: ({ value, children }) => {
      const target = value?.blank ? '_blank' : '_self'
      const rel = value?.blank ? 'noopener noreferrer' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-8">
          <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: '16/9' }}>
            <Image
              src={urlForImage(value).width(1200).url()}
              alt={value.alt ?? ''}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-xs text-muted-foreground mt-2 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

function PostSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-72 bg-muted rounded-2xl mb-8" />
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="h-5 w-28 bg-muted rounded-full" />
        <div className="h-10 bg-muted rounded w-4/5" />
        <div className="h-10 bg-muted rounded w-2/3" />
        <div className="flex gap-4 mt-4">
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-4 w-24 bg-muted rounded" />
        </div>
        <div className="h-px bg-border/40 my-6" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-4 bg-muted rounded" style={{ width: `${80 + Math.random() * 20}%` }} />
        ))}
      </div>
    </div>
  )
}

function BlogDetailContent() {
  const { t } = useLanguage()
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string

  const [post, setPost] = useState<BlogPost | null>(null)
  const [adjacent, setAdjacent] = useState<{ prev: AdjacentPost | null; next: AdjacentPost | null }>({
    prev: null,
    next: null,
  })
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    client
      .fetch<BlogPost>(POST_QUERY, { slug })
      .then(async (data) => {
        if (!data) {
          setNotFound(true)
          return
        }
        setPost(data)
        const adj = await client.fetch<{ prev: AdjacentPost | null; next: AdjacentPost | null }>(
          ADJACENT_QUERY,
          { publishedAt: data.publishedAt }
        )
        setAdjacent(adj ?? { prev: null, next: null })
      })
      .finally(() => setLoading(false))
  }, [slug])

  if (!loading && notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground text-lg">Post not found.</p>
        <Link href="/blog">
          <Button variant="outline">← Back to Blog</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pt-20 pb-20 relative">
        {/* Background glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: post
              ? `radial-gradient(ellipse 80% 30% at 50% 0%, ${post.accentFrom} 0%, transparent 60%)`
              : 'none',
          }}
          aria-hidden="true"
        />

        {loading ? (
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8">
            <PostSkeleton />
          </div>
        ) : post ? (
          <>
            {/* Cover image hero */}
            {post.coverImage && (
              <div className="relative w-full h-72 sm:h-96 overflow-hidden">
                <Image
                  src={urlForImage(post.coverImage).width(1600).height(700).url()}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              </div>
            )}

            <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              {/* Breadcrumb */}
              <nav
                aria-label="Breadcrumb"
                className={cn(
                  'flex items-center gap-1.5 text-xs text-muted-foreground mb-8',
                  post.coverImage ? '-mt-16 relative z-10' : 'mt-8'
                )}
              >
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/blog" className="hover:text-foreground transition-colors">
                  Blog
                </Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
              </nav>

              {/* Post header */}
              <header className="mb-10">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge
                    variant="outline"
                    className={cn('text-xs', post.categoryColor)}
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {post.category}
                  </Badge>
                  {post.featured && (
                    <Badge
                      variant="outline"
                      className="text-xs border-amber-500/30 text-amber-500"
                    >
                      Featured
                    </Badge>
                  )}
                  {post.tags?.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs text-muted-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
                  {post.title}
                </h1>

                <p className="text-lg text-muted-foreground leading-relaxed mb-6">{post.excerpt}</p>

                <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground border-t border-b border-border/40 py-4">
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
              </header>

              {/* Article body */}
              <article className="prose-custom max-w-none">
                {post.body && post.body.length > 0 ? (
                  <PortableText value={post.body} components={portableTextComponents} />
                ) : (
                  <p className="text-muted-foreground italic">No content yet.</p>
                )}
              </article>

              {/* Navigation */}
              <div className="mt-16 pt-8 border-t border-border/40 grid grid-cols-2 gap-4">
                {adjacent.prev ? (
                  <Link
                    href={`/blog/${adjacent.prev.slug}`}
                    className="group flex flex-col gap-1 p-4 rounded-xl border border-border/40 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                  >
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-0.5" />
                      Previous
                    </span>
                    <span className="text-sm font-medium text-foreground line-clamp-2">
                      {adjacent.prev.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
                {adjacent.next ? (
                  <Link
                    href={`/blog/${adjacent.next.slug}`}
                    className="group flex flex-col gap-1 p-4 rounded-xl border border-border/40 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 text-right"
                  >
                    <span className="flex items-center gap-1 justify-end text-xs text-muted-foreground">
                      Next
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <span className="text-sm font-medium text-foreground line-clamp-2">
                      {adjacent.next.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>

              {/* Back button */}
              <div className="mt-8 flex justify-center">
                <Link href="/blog">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blog
                  </Button>
                </Link>
              </div>
            </div>
          </>
        ) : null}
      </main>

      <Footer />
    </div>
  )
}

export default function BlogPostPage() {
  return (
    <LanguageProvider>
      <FilterProvider>
        <BlogDetailContent />
      </FilterProvider>
    </LanguageProvider>
  )
}
