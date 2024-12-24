import React from 'react'
import { Box, Flex } from '@mantine/core'
import Navlinks from './navlinks'
import SearchBox from '../ui/searchbox'

const Navbar = () => {
  return (
    <nav className="align-center bg-mantine-body fixed left-0 top-0 z-20 flex h-14 w-screen items-center justify-between px-4 py-2 md:px-16">
      <h1 className="font-bold" aria-label="Brand Logo">
        Study with us
      </h1>

      <SearchBox />

      <Navlinks />
    </nav>
  )
}

export default Navbar
