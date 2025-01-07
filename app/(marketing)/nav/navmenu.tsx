'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SignInButton } from '@clerk/nextjs'
import { MenuIcon } from 'lucide-react'
import React from 'react'

const Navmenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'}>
          <MenuIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="">
        {/* Links */}
        <DropdownMenuItem>
          <a href="/home">Home</a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a href="/courses">Courses</a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a href="/leaderboard">Leaderboards</a>
        </DropdownMenuItem>

        {/* Separator */}
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <SignInButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Navmenu
