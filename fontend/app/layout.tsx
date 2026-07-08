import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { AuthProvider } from '@/components/AuthProvider'
import './globals.css'

const playfairDisplay = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-serif',
})

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'WeddingCard - Tạo Thiệp Cưới Điện Tử Sang Trọng',
  description: 'Nền tảng tạo thiệp cưới điện tử #1 Việt Nam. Hàng trăm mẫu thiệp đẹp, quản lý khách mời, RSVP và nhận quà tặng trong một nền tảng.',
  generator: 'v0.app',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body className="antialiased font-sans bg-white">
        <AuthProvider>{children}</AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
