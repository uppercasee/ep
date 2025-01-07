import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const LeaderboardWidget = () => {
  return (
    <div className="">
      <Card>
        <CardHeader className="items-center font-semibold">
          Leaderboard
        </CardHeader>
        <CardContent>
          <Skeleton className="w-[250px] h-[400px]" />
        </CardContent>
      </Card>
    </div>
  )
}

export default LeaderboardWidget
