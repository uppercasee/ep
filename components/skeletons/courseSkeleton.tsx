import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

const CourseSkeleton = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-6">
      <Card>
        <CardHeader>
          <Skeleton className="w-3/4 h-6" />
          <Skeleton className="w-1/2 h-4 mt-2" />
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Skeleton className="w-full h-48 sm:h-60 md:h-72" />
          <div className="flex gap-1">
            <Skeleton className="w-20 h-6 rounded-md" />
            <Skeleton className="w-20 h-6 rounded-md" />
            <Skeleton className="w-20 h-6 rounded-md" />
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 items-center justify-between">
          <Skeleton className="w-24 h-8 rounded-md" />
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="w-3/4 h-6" />
          <Skeleton className="w-1/2 h-4 mt-2" />
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Skeleton className="w-full h-48 sm:h-60 md:h-72" />
          <div className="flex gap-1">
            <Skeleton className="w-20 h-6 rounded-md" />
            <Skeleton className="w-20 h-6 rounded-md" />
            <Skeleton className="w-20 h-6 rounded-md" />
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 items-center justify-between">
          <Skeleton className="w-24 h-8 rounded-md" />
        </CardFooter>
      </Card>
    </div>
  )
}

export default CourseSkeleton
