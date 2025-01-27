import React from 'react'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

const TabSkeleton = () => {
  return (
    <div className="border-t border-x flex flex-col items-center justify-center gap-4 py-1">
      <h2 className="text-lg font-semibold">
        <Skeleton className="h-6 w-48" />
      </h2>

      {Array.from({ length: 3 }).map((_) => (
        <div
          key={`${Math.random().toString(36).substr(2, 9)}`}
          className="w-full flex flex-col justify-between items-center px-4"
        >
          <div className="w-full flex justify-between items-center">
            <h3 className="text-lg">
              <Skeleton className="h-6 w-32" />
            </h3>

            <div className="flex gap-2 items-center justify-end ml-auto">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
            </div>
          </div>
          <Skeleton className="w-full h-[1px] my-2" />
        </div>
      ))}

      <Button disabled className="h-14" variant={'secondary'}>
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-6 w-24 ml-2" />
      </Button>
    </div>
  )
}

export default TabSkeleton
