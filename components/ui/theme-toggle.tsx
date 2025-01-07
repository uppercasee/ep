'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import ThemeToggleSkeleton from '../skeletons/themeToggleSkeleton'
import { Button } from './button'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <ThemeToggleSkeleton />
  }

  const handleToggle = () => {
    console.log('Current Theme:', theme)
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button
      size="icon"
      variant={'ghost'}
      onClick={handleToggle}
      className="flex items-center rounded-md justify-center p-2"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
