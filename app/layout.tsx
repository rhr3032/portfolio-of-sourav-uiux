import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
const siteTitle = 'Sourav Sarkar - UI/UX Designer'
const siteDescription =
  'I am Sourav Sarkar, a passionate UI/UX designer based in Bangladesh, specializing in crafting intuitive and visually stunning digital experiences. With a keen eye for detail and a user-centered approach, I transforms complex ideas into elegant designs that resonate with users. Explore his portfolio to see how he brings creativity and functionality together to create impactful designs.'

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sourav Sarkar',
  jobTitle: 'UI/UX Designer',
  description: siteDescription,
  url: siteUrl,
  image: `${siteUrl}/profile.png`,
  sameAs: [
    'https://instagram.com/johndoe',
    'https://linkedin.com/in/johndoe',
    'https://behance.net/johndoe',
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Sourav Sarkar Portfolio',
  url: siteUrl,
  description: siteDescription,
  inLanguage: 'en',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | Sourav Sarkar',
  },
  description: siteDescription,
  applicationName: 'Sourav Sarkar Portfolio',
  keywords: [
    'Sourav Sarkar',
    'UI UX Designer',
    'Product Designer',
    'Figma Designer',
    'Portfolio',
    'Bangladesh UI UX Designer',
    'Web Design',
    'User Experience',
    'User Interface',
  ],
  authors: [{ name: 'Sourav Sarkar' }],
  creator: 'Sourav Sarkar',
  publisher: 'Sourav Sarkar',
  category: 'Design and development portfolio',
  classification: 'Portfolio Website',
  appleWebApp: {
    capable: true,
    title: 'Sourav Sarkar Portfolio',
    statusBarStyle: 'default',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: siteTitle,
    description: siteDescription,
    siteName: 'Sourav Sarkar Portfolio',
    images: [
      {
        url: '/profile.png',
        width: 1200,
        height: 630,
        alt: 'Sourav Sarkar - UI/UX Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/profile.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  generator: 'Raisul R.',
  icons: {
    icon: '/favicon.ico?v=3',
    shortcut: '/favicon.ico?v=3',
    apple: '/favicon.ico?v=3',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
