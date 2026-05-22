import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Bar da Manu | Premium Nightlife Experience',
  description: 'Descubra a melhor experiência noturna em Juazeiro. Drinks exclusivos, música ao vivo e ambiente sofisticado. Reserve sua mesa agora.',
  keywords: ['bar', 'nightclub', 'drinks', 'Juazeiro', 'nightlife', 'reservas'],
  openGraph: {
    title: 'Bar da Manu | Premium Nightlife Experience',
    description: 'Descubra a melhor experiência noturna em Juazeiro.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a0a2e',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
