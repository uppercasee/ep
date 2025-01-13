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
        <CardFooter className="flex flex-col items-start gap-2">
          <div className="flex gap-1">
            <Badge variant={'secondary'}>Python</Badge>
            <Badge variant={'secondary'}>Programming</Badge>
          </div>
          <Button>Start Course</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default MyCourseSection
