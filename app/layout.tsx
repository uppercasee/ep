import type { Metadata } from 'next'
import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ThemeProvider } from '@/context/theme-provider'

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
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
