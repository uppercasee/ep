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
            <Skeleton className="w-full 2xl:w-[250px] h-[150px]" />
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default dailyQuestWidget
