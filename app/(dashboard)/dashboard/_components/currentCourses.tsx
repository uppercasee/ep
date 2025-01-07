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
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'

const CurrentCourseSection = () => {
  return (
    <div className="flex gap-2">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Python Full Course</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="w-[250px] h-[200px]" />
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2">
            <div className="flex gap-1">
              <Badge>Python</Badge>
              <Badge>Programming</Badge>
            </div>
            <Button>Resume</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Javascript Full Course</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="w-[250px] h-[200px]" />
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2">
            <div className="flex gap-1">
              <Badge>Javascript</Badge>
              <Badge>Programming</Badge>
            </div>
            <Button>Resume</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>React Full Course</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="w-[250px] h-[200px]" />
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2">
            <div className="flex gap-1">
              <Badge>Javascript</Badge>
              <Badge>Programming</Badge>
            </div>
            <Button>Resume</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default CurrentCourseSection
