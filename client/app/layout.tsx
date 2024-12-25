import type { Metadata } from 'next'
import './globals.css'

import '@mantine/core/styles.css'
import {
  ColorSchemeScript,
  MantineProvider,
  createTheme,
  mantineHtmlProps,
} from '@mantine/core'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'Elearning Platform',
  description: 'A Gamified Elearning Platform using Nextjs. ',
}

const theme = createTheme({
  fontFamily: 'Verdana, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: { fontFamily: 'Greycliff CF, sans-serif' },
  // breakpoints: {
  //   md:'1024px'
  // }
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <ClerkProvider>
          <MantineProvider defaultColorScheme="dark" theme={theme}>
            {children}
          </MantineProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
