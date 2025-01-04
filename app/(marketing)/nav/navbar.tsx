import { SearchBox } from '@/components/ui/searchBoxwithIcon'
import React from 'react'
import Navlinks from './navlinks'

const Navbar = () => {
  return (
    <nav className="align-center fixed left-0 top-0 z-20 flex h-14 w-screen items-center justify-between bg-mantine-body px-4 py-2 md:px-16">
      <h1 className="font-bold" aria-label="Brand Logo">
        Study with us
      </h1>

      <SearchBox />

      <Navlinks />
    </nav>
  )
}

export default Navbar
