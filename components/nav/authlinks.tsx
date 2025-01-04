'use client'

import { SignedIn, SignedOut, useAuth, UserButton } from '@clerk/nextjs'
import { Skeleton } from '@mantine/core'
import AuthSignInButton from '../ui/AuthSignInButton'
import { Settings2Icon } from 'lucide-react'

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
        <UserButton userProfileMode="navigation" userProfileUrl="/profile">
          <UserButton.MenuItems>
            <UserButton.Link
              label="Preferences"
              labelIcon={<Settings2Icon size={16} />}
              href="/profile/preferences"
            />
          </UserButton.MenuItems>
        </UserButton>
      </SignedIn>
    </div>
  )
}

export default AuthLinks
