import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TFI Burial Society | Affordable Funeral Cover for South African Families',
  description:
    'Flexible funeral plans from TFI Burial Society with cover options from R5,000 to R30,000 for individuals, spouses, children, and extended family. Underwritten by Old Mutual & RMA. Get a quote today.',
  keywords: [
    'funeral cover',
    'burial society',
    'funeral insurance',
    'South Africa',
    'TFI',
    'affordable funeral plan',
    'family cover',
    'Old Mutual',
    'RMA',
  ],
  authors: [{ name: 'TFI Burial Society' }],
  openGraph: {
    title: 'TFI Burial Society | Affordable Funeral Cover',
    description:
      'Flexible funeral plans from R5,000 to R30,000. Cover for individuals, spouses, children, and extended family. Underwritten by Old Mutual & RMA.',
    type: 'website',
    locale: 'en_ZA',
    siteName: 'TFI Burial Society',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TFI Burial Society | Affordable Funeral Cover',
    description:
      'Flexible funeral plans from R5,000 to R30,000. Cover for individuals, spouses, children, and extended family.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-body bg-bg-deep text-white antialiased">
        {/* Animated Gradient Mesh Background */}
        <div className="gradient-mesh" aria-hidden="true">
          <div className="mesh-orb mesh-orb-1" />
          <div className="mesh-orb mesh-orb-2" />
          <div className="mesh-orb mesh-orb-3" />
        </div>

        {/* Main Content */}
        <div className="relative z-[1]">
          {children}
        </div>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'rgba(12, 25, 50, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              backdropFilter: 'blur(20px)',
            },
          }}
          richColors
        />
      </body>
    </html>
  )
}
