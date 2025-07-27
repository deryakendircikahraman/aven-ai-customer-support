import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { MessageSquare } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aven Support Assistant',
  description: 'Intelligent customer support for Aven financial services',
  keywords: 'Aven, support, customer service, financial technology, credit lines',
  authors: [{ name: 'Aven Team' }],
  creator: 'Aven',
  publisher: 'Aven',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://aven-support.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Aven Support Assistant',
    description: 'Get instant help with Aven financial services',
    url: 'https://aven-support.vercel.app',
    siteName: 'Aven Support',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aven Support Assistant',
    description: 'Get instant help with Aven financial services',
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
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-gray-900">Aven Support</h1>
                      <p className="text-xs text-gray-500">Smart Assistant</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Assistant Online</span>
                  </div>
                </div>
              </div>
            </header>
            <main className="flex-1">
              {children}
            </main>
            <footer className="border-t bg-white/80 backdrop-blur-sm mt-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div>© 2024 Aven. All rights reserved.</div>
                  <div className="flex space-x-4">
                    <a href="#" className="hover:text-gray-700">Privacy Policy</a>
                    <a href="#" className="hover:text-gray-700">Terms of Service</a>
                    <a href="#" className="hover:text-gray-700">Support</a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
