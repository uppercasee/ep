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
import {
  CoinsIcon,
  HomeIcon,
  MenuIcon,
  SearchIcon,
  TrophyIcon,
} from 'lucide-react'
import React from 'react'

const Navmenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'}>
          <MenuIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-4 rounded-lg shadow-lg w-64">
        {/* Links */}
        <DropdownMenuItem className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          <a href="/home" className="flex gap-2 items-center justify-start">
            <HomeIcon />
            <span className="text-base font-medium">Home</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          <a href="/explore" className="flex gap-2 items-center justify-start">
            <SearchIcon />
            <span className="text-base font-medium">Explore</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          <a href="/pricing" className="flex gap-2 items-center justify-start">
            <CoinsIcon />
            <span className="text-base font-medium">Pricing</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          <a
            href="/leaderboard"
            className="flex gap-2 items-center justify-start"
          >
            <TrophyIcon />
            <span className="text-base font-medium">Leaderboard</span>
          </a>
        </DropdownMenuItem>

        {/* Separator */}
        <DropdownMenuSeparator />

        <DropdownMenuItem className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          <Button
            className="bg-black dark:bg-white rounded-fulltext-white dark:text-black w-full"
            asChild
          >
            <SignInButton />
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Navmenu
