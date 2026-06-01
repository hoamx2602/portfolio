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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilpex.com'
const siteName = 'Skilpex'

const defaultTitle       = 'Skilpex | AI, IIoT & RPA Consulting & Training'
const defaultDescription = 'Skilpex is a responsible industrial AI consultancy combining Artificial Intelligence, Industrial IoT, RPA, and AI governance — delivering hands-on training and strategic guidance to enterprises and public sector organisations.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    'Skilpex',
    'AI consulting',
    'responsible AI',
    'artificial intelligence training',
    'IIoT solutions',
    'Industrial Internet of Things',
    'Industry 4.0',
    'RPA automation',
    'UiPath training',
    'machine learning courses',
    'Python training',
    'data analytics',
    'digital transformation',
    'AI governance',
    'technology consulting',
    'enterprise automation',
    'predictive maintenance',
    'Bradford UK',
  ],
  authors: [{ name: 'Skilpex Team' }],
  creator: siteName,
  publisher: siteName,
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
    locale: 'en_GB',
    alternateLocale: ['en_US', 'fr_FR', 'ar'],
    url: siteUrl,
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: '/main-logo.svg',
        width: 142,
        height: 164,
        alt: 'Skilpex — Responsible Industrial AI Consultancy',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: defaultTitle,
    description: defaultDescription,
    images: ['/main-logo.svg'],
    creator: '@skilpex',
    site: '@skilpex',
  },
  alternates: {
    canonical: siteUrl,
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
        url: `${siteUrl}/main-logo.svg`,
        width: 142,
        height: 164,
      },
      sameAs: [
        'https://linkedin.com/company/skilpex',
        'https://twitter.com/skilpex',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        availableLanguage: ['English', 'Spanish', 'French', 'Arabic'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      publisher: { '@id': `${siteUrl}/#organization` },
      inLanguage: ['en-GB', 'es-ES', 'fr-FR', 'ar'],
    },
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/#webpage`,
      url: siteUrl,
      name: defaultTitle,
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#organization` },
      description: defaultDescription,
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#service`,
      name: 'Skilpex Consulting & Training',
      provider: { '@id': `${siteUrl}/#organization` },
      serviceType: ['AI Consulting', 'Industrial IoT', 'RPA Automation', 'Corporate Training', 'AI Governance'],
      areaServed: 'Worldwide',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Training Programmes',
        itemListElement: [
          {
            '@type': 'Course',
            name: 'Python Fundamentals for AI',
            description: 'Comprehensive Python programming course for data and AI applications',
            provider: { '@id': `${siteUrl}/#organization` },
            educationalLevel: 'Beginner',
            timeRequired: 'P5D',
          },
          {
            '@type': 'Course',
            name: 'Machine Learning Hands-On',
            description: 'Practical machine learning training from prototype to production',
            provider: { '@id': `${siteUrl}/#organization` },
            educationalLevel: 'Intermediate',
            timeRequired: 'P5D',
          },
          {
            '@type': 'Course',
            name: 'IIoT Implementation',
            description: 'Industrial IoT deployment and governance for operations leaders',
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
    <html lang="en-GB" className="bg-background scroll-smooth" suppressHydrationWarning>
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
