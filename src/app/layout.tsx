import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/toaster'
import Provider from '@/components/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Auth Project',
  description: 'Complete sign-up and sign-in system using shadcn/ui, Next.js, PostgreSQL, NextAuth, Prisma and bcrypt to enable smooth user authentication and routing within the app.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <main className='h-screen bg-zinc-100 flex flex-col justify-center items-center'>
            <Navbar />
            {children}
          </main>
          <Toaster />
        </Provider>
      </body>
    </html>
  )
}
