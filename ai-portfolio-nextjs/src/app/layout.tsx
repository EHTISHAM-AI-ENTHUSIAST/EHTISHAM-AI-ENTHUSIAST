import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ehtisham Ashraf | AI Software Engineer',
  description: 'Full-Stack Developer & AI Engineer specializing in building intelligent web applications with cutting-edge technologies.',
  keywords: ['AI Engineer', 'Full-Stack Developer', 'Next.js', 'React', 'Python', 'Machine Learning'],
  authors: [{ name: 'Ehtisham Ashraf' }],
  openGraph: {
    title: 'Ehtisham Ashraf | AI Software Engineer',
    description: 'Full-Stack Developer & AI Engineer specializing in building intelligent web applications.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-dark-300 text-white antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
