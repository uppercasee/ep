'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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
import { cn } from '@/lib/utils'
import { Crown, Medal, User } from 'lucide-react'

const mockLeaderboard = [
  { username: 'CodeMaster', points: 3245 },
  { username: 'DevQueen', points: 2985 },
  { username: 'SyntaxSamurai', points: 2870 },
  { username: 'ByteWizard', points: 2755 },
  { username: 'PixelPioneer', points: 2680 },
  { username: 'LogicLegend', points: 2590 },
  { username: 'BugSlayer', points: 2515 },
  { username: 'CloudCaptain', points: 2450 },
  { username: 'DataDruid', points: 2385 },
  { username: 'NetNinja', points: 2320 },
  { username: 'AIArtisan', points: 2275 },
  { username: 'CyberSentinel', points: 2210 },
  { username: 'QuantumQuester', points: 2155 },
  { username: 'CodeCrusader', points: 2090 },
  { username: 'JohnDoe', points: 2055 },
  { username: 'ScriptScribe', points: 1995 },
  { username: 'DebugDynamo', points: 1950 },
  { username: 'FrontendPhoenix', points: 1895 },
  { username: 'BackendBerserker', points: 1840 },
  { username: 'FullstackFalcon', points: 1795 },
  { username: 'LatecomerLeo', points: 1250 },
]

const LeaderboardPage = () => {
  const currentUser = 'JohnDoe'
  const allUsers = [...mockLeaderboard].sort((a, b) => b.points - a.points)
  const currentUserIndex = allUsers.findIndex(
    (user) => user.username === currentUser
  )
  const top20 = allUsers.slice(0, 20)
  const showSticky = currentUserIndex >= 20

  return (
    <Card className="mx-auto max-w-5xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-6 w-6" />
          Interactive Leaderboard
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
              const isCurrent = user.username === currentUser
              const isTop3 = index < 3

              return (
                <TableRow
                  key={user.username}
                  className={cn(
                    'transition-transform duration-200',
                    isCurrent
                      ? 'scale-[0.98] hover:scale-100 bg-accent/30'
                      : '',
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
                        <AvatarFallback>
                          {user.username[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className={cn(isTop3 ? 'font-semibold' : '')}>
                        {user.username}
                        {isCurrent && (
                          <Badge variant="secondary" className="ml-2">
                            You
                          </Badge>
                        )}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{user.points}</TableCell>
                </TableRow>
              )
            })}

            {showSticky && (
              <TableRow className="sticky bottom-0 bg-background border-t-2 shadow-lg">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <Badge variant="outline">#{currentUserIndex + 1}</Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {currentUser[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span>
                      {currentUser}
                      <Badge variant="secondary" className="ml-2">
                        Your Position
                      </Badge>
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {allUsers[currentUserIndex].points}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default LeaderboardPage
