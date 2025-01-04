'use client'

import { Anchor, Box, Flex } from '@mantine/core'
import React from 'react'
import ThemeToggle from '../ui/theme-toggle'
import AuthLinks from './authlinks'
import Navmenu from './navmenu'

const Navlinks = () => {
  return (
    <Flex justify="flex-end" gap="sm" align={'center'}>
      <ThemeToggle />
      {/* Desktop Navigation */}
      <Flex visibleFrom="sm" gap="lg" align={'center'}>
        <Anchor href="#" size="sm" underline={'hover'}>
          Home
        </Anchor>
        <Anchor href="/courses" size="sm" underline={'hover'}>
          Courses
        </Anchor>
        <Anchor href="/leaderboard" size="sm" underline={'hover'}>
          Leaderboard
        </Anchor>
        <AuthLinks />
      </Flex>

      {/* Mobile Navigation */}
      <Box hiddenFrom="sm">
        <Navmenu />
      </Box>
    </Flex>
  )
}

export default Navlinks
