import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { client } from '@/sanity/lib/client'
import { ThemeProvider } from '@/components/theme-provider'
import { SiteSettingsProvider } from '@/components/site-settings-context'
import { getSiteSettings } from '@/sanity/lib/settings'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const geistMono = Geist_Mono({ 
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techconsult.com'
const siteName = 'TechConsult'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'TechConsult | AI, IIoT & RPA Consulting & Training',
    template: '%s | TechConsult',
  },
  description: 'Leading technology consulting and training company specializing in Artificial Intelligence, Industrial IoT, and Robotic Process Automation. Transform your business with cutting-edge technology solutions.',
  keywords: [
    'AI consulting',
    'artificial intelligence training',
    'IIoT solutions',
    'Industrial Internet of Things',
    'RPA automation',
    'UiPath training',
    'machine learning courses',
    'Python training',
    'data analytics',
    'digital transformation',
    'technology consulting',
    'enterprise automation',
    'predictive maintenance',
    'edge computing',
  ],
  authors: [{ name: 'TechConsult Team' }],
  creator: 'TechConsult',
  publisher: 'TechConsult',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_ES', 'fr_FR'],
    url: siteUrl,
    siteName: siteName,
    title: 'TechConsult | AI, IIoT & RPA Consulting & Training',
    description: 'Transform your business with cutting-edge AI, Industrial IoT, and RPA solutions. Expert consulting and hands-on training programs.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TechConsult - Technology Consulting & Training',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechConsult | AI, IIoT & RPA Solutions',
    description: 'Expert technology consulting and training in AI, Industrial IoT, and Robotic Process Automation.',
    images: ['/og-image.jpg'],
    creator: '@techconsult',
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-US': `${siteUrl}/en`,
      'es-ES': `${siteUrl}/es`,
      'fr-FR': `${siteUrl}/fr`,
    },
  },
  category: 'technology',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0f172a' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
        width: 180,
        height: 60,
      },
      sameAs: [
        'https://linkedin.com/company/techconsult',
        'https://twitter.com/techconsult',
        'https://github.com/techconsult',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-555-123-4567',
        contactType: 'sales',
        availableLanguage: ['English', 'Spanish', 'French'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      publisher: { '@id': `${siteUrl}/#organization` },
      inLanguage: ['en-US', 'es-ES', 'fr-FR'],
    },
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/#webpage`,
      url: siteUrl,
      name: 'TechConsult | AI, IIoT & RPA Consulting & Training',
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#organization` },
      description: 'Leading technology consulting and training company specializing in AI, IIoT, and RPA.',
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#service`,
      name: 'TechConsult Technology Services',
      provider: { '@id': `${siteUrl}/#organization` },
      serviceType: ['Technology Consulting', 'Corporate Training', 'Digital Transformation'],
      areaServed: 'Worldwide',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Training Programs',
        itemListElement: [
          {
            '@type': 'Course',
            name: 'Python Fundamentals',
            description: 'Comprehensive 5-day Python programming course for beginners',
            provider: { '@id': `${siteUrl}/#organization` },
            educationalLevel: 'Beginner',
            timeRequired: 'P5D',
          },
          {
            '@type': 'Course',
            name: 'ML Hands-On',
            description: 'Intermediate 5-day machine learning practical training',
            provider: { '@id': `${siteUrl}/#organization` },
            educationalLevel: 'Intermediate',
            timeRequired: 'P5D',
          },
          {
            '@type': 'Course',
            name: 'IIoT Implementation',
            description: 'Industrial IoT implementation and deployment training',
            provider: { '@id': `${siteUrl}/#organization` },
            educationalLevel: 'Intermediate',
            timeRequired: 'P5D',
          },
          {
            '@type': 'Course',
            name: 'RPA Development with UiPath',
            description: 'Robotic Process Automation development using UiPath Studio',
            provider: { '@id': `${siteUrl}/#organization` },
            educationalLevel: 'Intermediate',
            timeRequired: 'P5D',
          },
        ],
      },
    },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const siteSettings = await getSiteSettings()

  // Theme is resolved separately (needed before hydration for ThemeProvider)
  let globalTheme = 'system'
  try {
    const raw = await client.fetch<{ theme?: string }>(
      `*[_type == "siteSettings"][0]{ theme }`,
      {},
      { next: { revalidate: 30 } }
    )
    if (raw?.theme) globalTheme = raw.theme
  } catch {
    // keep 'system'
  }

  return (
    <html lang="en" className="bg-background scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/main-logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/main-logo.svg" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          forcedTheme={globalTheme !== 'system' ? globalTheme : undefined}
          disableTransitionOnChange
        >
          <SiteSettingsProvider value={siteSettings}>
            {children}
            {process.env.NODE_ENV === 'production' && <Analytics />}
          </SiteSettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
