'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { UserButton, useAuth } from '@clerk/nextjs'
import { Settings2Icon } from 'lucide-react'

const UserLogo = () => {
  const { isLoaded } = useAuth()

  if (!isLoaded) {
    return <Skeleton className="h-[30px] w-[30px] rounded-full" />
  }
  return (
    <UserButton userProfileMode="navigation" userProfileUrl="/profile">
      <UserButton.MenuItems>
        <UserButton.Link
          label="Preferences"
          labelIcon={<Settings2Icon size={16} />}
          href="/profile/preferences"
        />
      </UserButton.MenuItems>
    </UserButton>
  )
}

export default UserLogo
