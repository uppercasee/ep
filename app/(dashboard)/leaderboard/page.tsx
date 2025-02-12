'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getAllUserXp } from '@/features/leaderboard/actions/get_xp'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { Crown, Medal } from 'lucide-react'

const LeaderboardPage = () => {
  const { data, isLoading, error } = useQuery(['leaderboard'], getAllUserXp)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error fetching leaderboard</div>
  }

  const top20 = data?.slice(0, 20) ?? []

  return (
    <Card className="mx-auto max-w-5xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-6 w-6" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Participant</TableHead>
              <TableHead className="text-right">XP</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="relative max-h-[600px] overflow-auto">
            {top20.map((user, index) => {
              const isTop3 = index < 3

              return (
                <TableRow
                  key={user.username}
                  className={cn(
                    'transition-transform duration-200',
                    isTop3 ? 'bg-muted/30' : ''
                  )}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {index === 0 && <Crown className="h-4 w-4" />}
                      {index === 1 && <Medal className="h-4 w-4" />}
                      {index === 2 && <Medal className="h-4 w-4" />}
                      <Badge variant={isTop3 ? 'default' : 'outline'}>
                        #{index + 1}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={user.imageUrl}
                          alt={user.username[0]}
                        />
                        <AvatarFallback>
                          {user.username[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className={cn(isTop3 ? 'font-semibold' : '')}>
                        {user.username}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{user.xp}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default LeaderboardPage
