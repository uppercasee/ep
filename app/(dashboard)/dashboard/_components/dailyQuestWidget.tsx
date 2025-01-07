import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const dailyQuestWidget = () => {
  return (
    <>
      <div className="">
        <Card>
          <CardHeader className="items-center font-semibold">
            Daily Quest
          </CardHeader>
          <CardContent>
            <Skeleton className="w-[250px] h-[100px]" />
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default dailyQuestWidget
