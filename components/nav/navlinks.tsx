'use client'

import React from 'react'
import ThemeToggle from '../ui/theme-toggle'
import AuthLinks from './authlinks'
import Navmenu from './navmenu'

const Navlinks = () => {
  return (
    <div className="flex justify-end gap-3 items-center">
      <ThemeToggle />

      {/* Desktop Navigation */}
      <div className="hidden sm:flex gap-4 items-center">
        <a href="/" className="text-sm hover:underline">
          Home
        </a>
        <a href="/courses" className="text-sm hover:underline">
          Courses
        </a>
        <a href="/leaderboard" className="text-sm hover:underline">
          Leaderboard
        </a>
        <AuthLinks />
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden">{<Navmenu />}</div>
    </div>
  )
}

export default Navlinks
