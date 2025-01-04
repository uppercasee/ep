'use client'

import {
  ActionIcon,
  Skeleton,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  })
  const computedColorScheme = useComputedColorScheme('dark')
  const [mounted, setMounted] = useState(false)

  const handleToggle = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <ActionIcon
        variant="light"
        color="gray"
        radius={'lg'}
        size={'sm'}
        className="relative ml-1 mr-1.5 flex items-center justify-center rounded-full p-4"
      >
        <Skeleton circle height={24} width={24} />
        <span className="sr-only">Toggle theme Skeleton</span>
      </ActionIcon>
    )
  }

  return (
    <ActionIcon
      variant="light"
      color="gray"
      radius={'lg'}
      size={'sm'}
      onClick={handleToggle}
      className="relative mr-1.5 flex items-center justify-center rounded-full p-4"
    >
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all ${computedColorScheme === 'dark' ? 'opacity-0' : 'opacity-100'}`}
      />
      <Moon
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${computedColorScheme === 'dark' ? 'opacity-100' : 'opacity-0'}`}
      />
      <span className="sr-only">Toggle theme</span>
    </ActionIcon>
  )
}
