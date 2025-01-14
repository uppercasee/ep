'use client'

import UserLogo from '@/app/(dashboard)/dashboard/_components/userButton'
import { ButtonSkeleton } from '@/components/skeletons/buttonSkeleton'
import AuthSignInButton from '@/components/ui/AuthSignInButton'
import { SignedIn, SignedOut, useAuth } from '@clerk/nextjs'

const AuthLinks = () => {
  const { isLoaded } = useAuth()

  if (!isLoaded) {
    return <ButtonSkeleton />
  }

  return (
    <div className="flex justify-center items-center">
      <SignedOut>
        <AuthSignInButton />
      </SignedOut>
      <SignedIn>
        <UserLogo />
      </SignedIn>
    </div>
  )
}

export default AuthLinks
