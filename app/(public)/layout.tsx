import '../global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Navbar } from '../components/nav'
import { Analytics } from '@vercel/analytics/react'
import Footer from '../components/footer'
import { prodUrl } from '../sitemap'

export const metadata: Metadata = {
  metadataBase: new URL(prodUrl),
  title: {
    default: 'Sonjeet Paul',
    template: '%s | Your Name (@yourhandle)',
  },
  description:
    'Software developer, writer, and digital gardener sharing thoughts on technology and development.',
  openGraph: {
    title: 'Your Name (@yourhandle)',
    description:
      'Software developer, writer, and digital gardener sharing thoughts on technology and development.',
    url: prodUrl,
    siteName: 'Your Name (@yourhandle)',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        alt: 'Your Name (@yourhandle)',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Name (@yourhandle)',
    description:
      'Software developer, writer, and digital gardener sharing thoughts on technology and development.',
    site: '@yourhandle',
    creator: '@yourhandle',
    images: ['/og-image.png'],
  },
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
}

const inter = GeistSans

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`text-slate-900 bg-slate-50 dark:text-slate-100 dark:bg-slate-950 ${inter.className}`}
    >
      <body className="antialiased mt-8 px-4 mx-auto overflow-x-hidden">
        <main className="min-w-0 max-w-prose mx-auto mt-6 px-2 space-y-16">
          <div className="space-y-8 sm:space-y-12">
            <Navbar />
            {children}
          </div>
          <Footer />
        </main>
        <Analytics />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'http://schema.org',
              '@type': 'Person',
              id: 'yourhandle',
              email: 'mailto:your.email@example.com',
              image: `${prodUrl}/static/images/placeholder-avatar.svg`,
              jobTitle: 'Software Developer',
              familyName: 'Your Last Name',
              givenName: 'Your First Name',
              name: 'Your Full Name',
              url: prodUrl,
              sameAs: [
                'https://twitter.com/yourhandle',
                'https://github.com/yourhandle',
                'https://linkedin.com/in/yourhandle',
              ],
            }),
          }}
        />
      </body>
    </html>
  )
}
