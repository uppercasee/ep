'use client'

import { SignedIn, SignedOut, useAuth, UserButton } from '@clerk/nextjs'
import { Skeleton } from '@mantine/core'
import AuthSignInButton from '../ui/AuthSignInButton'
import { DotIcon } from 'lucide-react'

const AuthLinks = () => {
  const { isLoaded } = useAuth()

  if (!isLoaded) {
    return <Skeleton height={30} width={30} radius="xl" visible />
  }

  return (
    <div>
      <SignedOut>
        <AuthSignInButton />
      </SignedOut>

      <SignedIn>
        <UserButton userProfileMode="navigation" userProfileUrl="/me">
          <UserButton.MenuItems>
            <UserButton.Action
              label="Preferences"
              labelIcon={<DotIcon />}
              open="preferences"
            />
          </UserButton.MenuItems>

          <UserButton.UserProfilePage
            label="Preferences"
            labelIcon={<DotIcon />}
            url="preferences"
          >
            <div>
              <h1>Help Page</h1>
              <p>This is the custom help page</p>
            </div>
          </UserButton.UserProfilePage>
        </UserButton>{' '}
      </SignedIn>
    </div>
  )
}

export default AuthLinks
