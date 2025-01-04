'use client'

import { SignInButton } from '@clerk/nextjs'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { BurgerButton } from '../ui/BurgerButton'
import { Button } from '../ui/button'

const Navmenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'}>Open</Button>
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
