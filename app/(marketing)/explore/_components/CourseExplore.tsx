'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { CldImage } from '@/lib/cloudinary'
import { GetAllCourses } from '@/server/actions/courseActions'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

const CourseExplore = async () => {
  const { data, isLoading, isError } = useQuery(['courses'], GetAllCourses)
  const courses = data || []
  console.log(courses)

  if (isLoading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-6">
        {/* Render skeleton loaders for each course */}
        {[...Array(6)].map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <Card key={index}>
            <CardHeader>
              <Skeleton className="w-32 h-6" />
              <Skeleton className="w-24 h-5 mt-1" />
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Skeleton className="w-full h-48 sm:h-60 md:h-72" />
              <div className="flex flex-wrap gap-2 w-auto">
                {[...Array(3)].map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <Skeleton key={i} className="w-20 h-6 rounded-full" />
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 items-center justify-between">
              <Skeleton className="w-24 h-8" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (isError) {
    return <div>Error Loading the Page..</div>
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-6">
      {courses?.map((course) => (
        <Card key={course.title}>
          <CardHeader>
            <CardTitle className="text-balance">{course.title}</CardTitle>
            <CardDescription>{course.category}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {course.thumbnailUrl ? (
              <CldImage
                src={course.thumbnailUrl}
                width="250"
                height="250"
                alt="Course Thumbnail"
                crop={{ type: 'fill' }}
                // TODO: Add a placeholder blur effect here if required
              />
            ) : (
              <Skeleton className="w-full h-48 sm:h-60 md:h-72" />
            )}
            <div className="flex flex-wrap gap-2 w-auto">
              {(course.tags ?? []).map((tag) => (
                <Badge
                  variant="secondary"
                  key={tag}
                  className="inline-block max-w-fit"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 items-center justify-between">
            <Link href={`/courses/${course.id}/preview`}>
              <Button>View</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default CourseExplore
