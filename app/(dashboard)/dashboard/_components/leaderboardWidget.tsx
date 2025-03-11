'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { getAllUserXp } from '@/features/leaderboard/actions/get_xp'
import { useQuery } from '@tanstack/react-query'
import { Crown, Medal } from 'lucide-react'

const LeaderboardWidget = () => {
  const { data, isLoading, error } = useQuery(['leaderboard'], getAllUserXp)

  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto p-2 shadow-lg border border-gray-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Crown className="h-5 w-5" />
            Top Performers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Skeleton loaders for the top 3 users */}
          {[1, 2, 3].map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-full" />
                <div className="flex flex-col">
                  <Skeleton className="w-24 h-4 mb-2" />
                  <Skeleton className="w-16 h-4" />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }
  if (error) {
    return <div>Error fetching leaderboard</div>
  }

  const top3 = data?.slice(0, 3) ?? []

  return (
    <Card className="w-full max-w-md mx-auto p-2 shadow-lg border border-gray-500">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Crown className="h-5 w-5" />
          Top Performers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {top3.map((user, index) => (
          <div
            key={user.username}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="h-6 w-6 justify-center">
                {index + 1}
              </Badge>
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                <AvatarImage
                  src={user.imageUrl}
                  alt={`${user.username}'s avatar`}
                />
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
                  <span className="text-xs">{user.xp} XP</span>
                </div>
              </div>
            </div>
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
