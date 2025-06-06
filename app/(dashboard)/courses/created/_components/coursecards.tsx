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
import { GetAllCreatedCourses } from '@/server/actions/courseActions'
import Link from 'next/link'
import DeleteCourseButton from './deleteButton'

const CourseCards = async () => {
  const courses = await GetAllCreatedCourses()
  console.log(courses)

  if (courses.length === 0) {
    return (
      <div className="flex h-screen justify-center items-center">
        <p className="text-center text-2xl font-bold">
          You have not created any courses
        </p>
      </div>
    )
  }

  return (
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
              <Skeleton className="w-full h-60" />
            )}
            <div className="flex flex-wrap gap-1 w-auto">
              {(course.tags ?? []).map((tag) => (
                <Badge variant={'secondary'} key={tag} className="h-auto">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 items-center justify-between">
            <Link href={`/courses/${course.id}/edit`} prefetch>
              <Button>Edit</Button>
            </Link>
            <DeleteCourseButton id={course.id} />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default CourseCards
