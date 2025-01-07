import React from 'react'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

const ThemeToggleSkeleton = () => {
  return (
    <Button
      size="icon"
      variant={'ghost'}
      className="flex items-center rounded-md justify-center p-2"
    >
      <Skeleton className="flex items-center justify-center w-5 h-5 rounded-full" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default ThemeToggleSkeleton
