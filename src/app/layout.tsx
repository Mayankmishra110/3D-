import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google'
import type { Metadata } from 'next'
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider'
import { CustomCursor } from '@/components/ui/CustomCursor'
import './globals.css'

const syne = Syne({ 
  subsets: ['latin'], 
  variable: '--font-syne', 
  weight: ['600', '700', '800'] 
})
const dmSans = DM_Sans({ 
  subsets: ['latin'], 
  variable: '--font-dm-sans', 
  weight: ['300', '400', '500'] 
})
const jetbrains = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-jetbrains', 
  weight: ['400', '500'] 
})

export const metadata: Metadata = {
  title: 'Mayank Mishra · Senior Software Engineer',
  description: 'Frontend Architect. AI Product Builder. Distributed systems engineer who ships — from intern to Senior in 15 months, 4 production products, 50K+ users.',
  openGraph: {
    title: 'Mayank Mishra · Senior Software Engineer',
    description: 'Building AI-powered products and distributed platforms. Available for SDE-2 / Senior Frontend roles.',
    url: 'https://mayankbuilt.com',
    siteName: 'Mayank Mishra Portfolio',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', creator: '@dev_manuss' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${syne.variable} ${dmSans.variable} ${jetbrains.variable} font-sans bg-bg text-text-1 antialiased`}
      >
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <CustomCursor />
      </body>
    </html>
  )
}
