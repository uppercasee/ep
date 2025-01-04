'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from './button'
import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleToggle = () => {
    console.log('Current Theme:', theme)
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button
      size="icon"
      variant={'outline'}
      onClick={handleToggle}
      className="flex items-center rounded-full justify-center p-2"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
