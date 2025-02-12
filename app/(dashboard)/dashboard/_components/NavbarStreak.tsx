'use client'

import { Button } from '@/components/ui/button'
import { getUserStreak } from '@/features/user_profile/actions/get_streak'
import { useQuery } from '@tanstack/react-query'
import { FlameIcon } from 'lucide-react'
import { toast } from 'sonner'

const NavbarStreak = () => {
  const {
    data: streak,
    isLoading,
    isError,
  } = useQuery(['userStreak'], getUserStreak)

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" className="flex gap-1">
        <FlameIcon /> 0
      </Button>
    )
  }

  if (isError) {
    toast.error('Error Fetching Streak.')
    return (
      <Button variant="ghost" size="sm" className="flex gap-1">
        <FlameIcon /> 0
      </Button>
    )
  }

  return (
    <Button variant="ghost" size="sm" className="flex gap-1">
      <FlameIcon
        fill={streak && streak > 0 ? 'orange' : 'none'}
        className={streak && streak > 0 ? 'text-orange-500' : ''}
      />
      {streak}
    </Button>
  )
}

export default NavbarStreak
