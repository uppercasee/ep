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
import { getAllEnrolledCourses } from '@/features/courses/actions/get_enrolled_courses'
import { CldImage } from '@/lib/cloudinary'
import { GetAllCourses } from '@/server/actions/courseActions'
import Link from 'next/link'

const MyCourseSection = async () => {
  const courses = await getAllEnrolledCourses()
  console.log(courses)

  if (courses.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-lg font-semibold">
          You have not enrolled in any courses yet.
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Browse the course catalog and start learning today!
        </p>
        <Link href="/explore">
          <Button className="mt-4">Browse Courses</Button>
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="text-md font-semibold">Continue Studying...</div>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-6">
        {courses.map((course) => (
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
              <div className="flex gap-1">
                {(course.tags ?? []).map((tag) => (
                  <Badge variant={'secondary'} key={tag}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 items-center justify-between">
              <Link href={`/courses/${course.id}/view`}>
                <Button>Resume</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}

export default MyCourseSection
