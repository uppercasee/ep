'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { claimQuest } from '@/features/quests/actions/claimQuest'
import { fetchDailyQuests } from '@/features/quests/actions/getQuests'
import { useQuery } from '@tanstack/react-query'
import { CheckCircle } from 'lucide-react'

export default function DailyQuestWidget() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['dailyQuests'],
    queryFn: fetchDailyQuests,
  })

  const quests = data || []

  console.log(quests)

  const handleClaim = async (id: string) => {
    console.log(id)
    await claimQuest(id)
    refetch()
  }

  if (isLoading) return <p>Loading quests...</p>
  if (error) return <p>Error loading quests</p>

  return (
    <Card className="w-full max-w-md mx-auto p-4 shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">
          🎯 Daily Quests
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {quests.map(
            (quest) =>
              quest ? (
                <div
                  key={quest.id}
                  className="flex items-center justify-between"
                >
                  <div className="w-full">
                    <p className="font-medium text-sm">
                      {quest.title}
                      <br />({quest.progress ?? 0} / {quest.target})
                    </p>

                    <Progress
                      value={Math.min(
                        ((quest.progress ?? 0) / quest.target) * 100,
                        100
                      )}
                      className="mt-2"
                    />
                  </div>
                  {quest.claimed ? (
                    <Button variant="ghost" className="text-green-500" disabled>
                      <CheckCircle className="mr-2 h-4 w-4" /> Done
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      className="ml-4 flex items-center justify-center"
                      onClick={() => handleClaim(quest.id)}
                      disabled={
                        (quest.progress ?? 0) < (quest.target ?? 1) ||
                        !!quest.claimed
                      }
                    >
                      Claim
                    </Button>
                  )}
                </div>
              ) : null // If quest is null or undefined, don't render anything
          )}
        </div>
      </CardContent>
    </Card>
  )
}
