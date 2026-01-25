import React from "react"
import type { Metadata } from 'next'
import { auth } from "@/auth"
import { Geist, Geist_Mono } from 'next/font/google'

import { Analytics } from '@vercel/analytics/next'
import { Toaster } from "sonner"
import { TrafficTracker } from "@/components/traffic-tracker"
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Portfolio | Data Science & Machine Learning',
  description: 'BSCS Student & Aspiring Data Scientist specializing in Machine Learning, Python, and Data Analysis',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        {/* Only track if user is NOT logged in (session.user is undefined) */}
        <TrafficTracker shouldTrack={!session?.user} />
        <Analytics />

        <Toaster richColors position="top-center" />
      </body>
    </html>
  )
}
