'use client'

import { Button } from '@/components/ui/button'
import { SearchBox } from '@/components/ui/searchBoxwithIcon'
import { getCookie, setCookie } from '@/lib/cookies'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import NavbarStreak from './NavbarStreak'
import UserLogo from './userButton'

const Navbar = () => {
  const router = useRouter()
  const [mode, setMode] = useState<'student' | 'teacher'>('student')

  useEffect(() => {
    const savedMode = getCookie('mode') || 'student'
    setMode(savedMode as 'student' | 'teacher')
  }, [])

  const toggleMode = () => {
    const newMode = mode === 'student' ? 'teacher' : 'student'
    setCookie('mode', newMode, 365) // Store for 1 year
    setMode(newMode)
    router.refresh()
  }

  return (
    <header className="flex items-center justify-between px-4 py-2 w-full">
      <SearchBox />
      <div className="flex flex-row items-center justify-end gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="flex gap-1"
          onClick={toggleMode}
        >
          {mode === 'teacher' ? 'Student Mode' : 'Teacher Mode'}
        </Button>
        <NavbarStreak />
        <UserLogo />
      </div>
    </header>
  )
}

export default Navbar
