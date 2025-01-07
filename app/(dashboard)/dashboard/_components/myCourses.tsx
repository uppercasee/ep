import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const MyCourseSection = () => {
  return (
    <div className="flex gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Python Full Course</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-[250px] h-[200px]" />
        </CardContent>
        <CardFooter>
          <Button>Start Course</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default MyCourseSection
