'use client'

import ThemeToggle from '@/components/ui/theme-toggle'
import React from 'react'
import AuthLinks from './authlinks'
import Navmenu from './navmenu'

const Navlinks = () => {
  return (
    <div className="flex justify-end gap-3 items-center">
      <ThemeToggle />

      {/* Desktop Navigation */}
      <div className="hidden sm:flex gap-4 items-center">
        <a href="/" className="hover:underline">
          Home
        </a>
        <a href="/explore" className="hover:underline">
          Explore
        </a>
        <a href="/#faq" className="hover:underline">
          FAQ
        </a>
        {/* <a href="/pricing" className="hover:underline"> */}
        {/*   Pricing */}
        {/* </a> */}
        <AuthLinks />
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden">{<Navmenu />}</div>
    </div>
  )
}

export default Navlinks
