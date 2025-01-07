'use client'

import { ButtonSkeleton } from '@/components/skeletons/buttonSkeleton'
import AuthSignInButton from '@/components/ui/AuthSignInButton'
import { useAuth } from '@clerk/nextjs'

const AuthLinks = () => {
  const { isLoaded } = useAuth()

  if (!isLoaded) {
    return <ButtonSkeleton />
  }

  return (
    <div>
      <AuthSignInButton />
    </div>
  )
}

export default AuthLinks
