import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/ui/theme-toggle'
import { FlameIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import UserLogo from './userButton'

const Navbar = () => {
  return (
    <header className="flex items-center justify-center px-4 py-2 relative">
      <div>
        <a href="/">Study with Us</a>
      </div>
      <div className="flex flex-row items-center gap-2 p-2 ml-auto relative w-full justify-end">
        <ThemeToggle />
        <Button variant={'ghost'} size={'sm'} className="flex gap-1">
          <FlameIcon /> 0
        </Button>
        <Button asChild size={'sm'} variant={'secondary'} className="">
          <Link href="/courses/create">
            <PlusIcon className="md:mr-2" />{' '}
            <span className="hidden md:block">Create Course</span>
          </Link>
        </Button>

        <UserLogo />
      </div>
    </header>
  )
}

export default Navbar
