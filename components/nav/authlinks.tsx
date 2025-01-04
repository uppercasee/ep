'use client'

import { SignedIn, SignedOut, UserButton, useAuth } from '@clerk/nextjs'
import { Settings2Icon } from 'lucide-react'
import AuthSignInButton from '../ui/AuthSignInButton'
import { Skeleton } from '../ui/skeleton'

const AuthLinks = () => {
  const { isLoaded } = useAuth()

  if (!isLoaded) {
    return <Skeleton className="h-[30px] w-[30px] rounded-full" />
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
