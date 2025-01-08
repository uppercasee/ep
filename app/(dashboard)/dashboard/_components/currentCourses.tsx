import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
const courses = [
  {
    title: 'Python Full Course',
    tags: ['Python', 'Programming'],
  },
  {
    title: 'Javascript Full Course',
    tags: ['Javascript', 'Programming'],
  },
  {
    title: 'React Full Course',
    tags: ['React', 'Programming', 'Javascript'],
  },
]

const CurrentCourseSection = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-6">
      {courses.map((course) => (
        <Card key={course.title}>
          <CardHeader>
            <CardTitle>{course.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1.5">
            <Skeleton className="w-full h-48 sm:h-60 md:h-72" />
            <div className="text-muted-foreground">Created By: "username"</div>
            <div className="flex gap-1">
              {course.tags.map((tag) => (
                <Badge variant={'secondary'} key={tag}>
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2">
            <Button>Resume</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default CurrentCourseSection
