import { GraduationCapIcon } from 'lucide-react'
import React from 'react'
import Navlinks from './navlinks'

const Navbar = () => {
  return (
    <nav className="align-center fixed left-0 top-0 z-20 flex h-14 w-screen items-center justify-between px-4 md:px-16 py-2">
      <a href="/" className="text-md md:text-lg font-bold">
        <div className="flex justify-between items-center gap-2">
          <GraduationCapIcon />
          <span>Study With Us</span>
        </div>
      </a>

      <Navlinks />
    </nav>
  )
}

export default Navbar
