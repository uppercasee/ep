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
import type { CoursesTable } from '@/drizzle/schema'
import { CldImage } from '@/lib/cloudinary'
import { clerkClient } from '@clerk/nextjs/server'
import { StarIcon } from 'lucide-react'
import Link from 'next/link'

type Course = typeof CoursesTable.$inferInsert

const PrivacyPolicyPage = () => {
  const course: Course = {
    title: 'Full Python course for GUI developement with Tkinter',
    description: '',
    thumbnailUrl: '',
    createdBy: '',
    tags: ['gui', 'python', 'tkinter'],
    category: 'Programming',
    // ratings: 4.5,
    price: 1000,
    isPublished: false,
  }

  return (
    <div>
      <CourseCard course={course} />
    </div>
  )
}

export default PrivacyPolicyPage

interface CourseCardProps {
  course: typeof CoursesTable.$inferInsert
}

const CourseCard = async ({ course }: CourseCardProps) => {
  const userid = course.createdBy
  const client = await clerkClient()
  const user = await client.users.getUser(userid)

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-6 p-20">
        <Card key={course.title} className="hover:scale-105">
          <CardHeader>
            <CardTitle className="text-balance">{course.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <CldImage
              src="cld-sample-5"
              width="250"
              height="250"
              alt="Course Thumbnail"
            />
            <div className="flex gap-2">Created by: {user.username}</div>
            <CardDescription>{course.category}</CardDescription>
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
          <CardFooter className="flex flex-col gap-2.5">
            <div className="text-sm flex gap-2 items-center w-full">
              <StarIcon fill="yellow" size={20} />
              <span className="font-semibold">4.5</span>
              <span className="text-muted-foreground">
                125+ students enrolled
              </span>
            </div>
            <div className="flex justify-between gap-2 w-full">
              <Link href={`/courses/${course.id}/view`}>
                <Button>View</Button>
              </Link>
              {/* <Link href={`/courses/${course.id}/view`}> */}
              {/*   <Button>View</Button> */}
              {/* </Link> */}
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
