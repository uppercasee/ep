import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'mantine-body': 'var(--mantine-color-body)', // Reference Mantine CSS variable
        'mantine-text': 'var(--mantine-color-text)', // Example for text color
      },
    },
  },
  darkMode: ['class', 'class'],
  plugins: [],
} satisfies Config
