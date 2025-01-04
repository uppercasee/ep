'use client'

import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'
import { Burger, Menu } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React from 'react'

const Navmenu = () => {
  const [opened, { toggle }] = useDisclosure()

  return (
    <Menu opened={opened} onClose={() => toggle()} withinPortal>
      <Menu.Target>
        <Burger
          aria-label="Toggle navigation"
          lineSize={2}
          opened={opened}
          onClick={toggle}
          size="sm"
          py={'sm'}
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={toggle}>Home</Menu.Item>
        <Menu.Item onClick={toggle}>Courses</Menu.Item>
        <Menu.Item onClick={toggle}>Leaderboard</Menu.Item>
        <Menu.Divider />

        <SignedOut>
          <Menu.Item>
            <div className="rounded bg-blue-500 px-4 py-1.5 text-center text-white">
              <SignInButton />
            </div>
          </Menu.Item>
        </SignedOut>

        <SignedIn>
          <Menu.Item>
            <div className="rounded border border-blue-500 px-4 py-1.5 text-center text-blue-500">
              <SignOutButton />
            </div>
          </Menu.Item>
        </SignedIn>

        <SignedOut>
          <Menu.Item>
            <div className="rounded border border-blue-500 px-4 py-1.5 text-center text-blue-500">
              <SignUpButton />
            </div>
          </Menu.Item>
        </SignedOut>
      </Menu.Dropdown>
    </Menu>
  )
}

export default Navmenu
