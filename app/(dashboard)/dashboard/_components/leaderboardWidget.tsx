import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Crown, Medal } from 'lucide-react'

const topUsers = [
  { username: 'CodeMaster', points: 2450, image: '' },
  { username: 'DevQueen', points: 2315, image: '' },
  { username: 'SyntaxSamurai', points: 2250, image: '' },
]

const LeaderboardWidget = () => {
  return (
    //TODO: make the size a bit responsive
    <Card className="w-full max-w-md mx-auto p-4 shadow-lg border border-gray-500">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Crown className="h-5 w-5" />
          Top Performers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topUsers.map((user, index) => (
          <div
            key={user.username}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="h-6 w-6 justify-center">
                {index + 1}
              </Badge>
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.image} />
                <AvatarFallback>
                  {user.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user.username}</p>
                <div className="flex items-center gap-1 text-muted-foreground">
                  {index === 0 && <Crown className="h-3 w-3" />}
                  {index === 1 && <Medal className="h-3 w-3" />}
                  {index === 2 && <Medal className="h-3 w-3" />}
                  <span className="text-xs">{user.points} XP</span>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="px-2 py-1 text-xs">
              #{index + 1}
            </Badge>
          </div>
        ))}
        <div className="text-center text-sm text-muted-foreground">
          <a href="/leaderboard" className="hover:underline">
            View Full Leaderboard →
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

export default LeaderboardWidget
