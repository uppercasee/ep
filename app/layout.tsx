import type { Metadata } from 'next'
import './globals.css'

import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/context/theme-provider'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

export const metadata: Metadata = {
  title: 'Elearning Platform',
  description: 'A Gamified Elearning Platform using Nextjs. ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider afterSignOutUrl={'/'} appearance={{ baseTheme: dark }}>
            {children}
            <Toaster />
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
