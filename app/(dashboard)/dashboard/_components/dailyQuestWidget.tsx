'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { CheckCircle } from 'lucide-react'
import React, { useState } from 'react'

const initialQuests = [
  { id: 1, title: 'Complete 3 lessons', progress: 67, claimed: false },
  { id: 2, title: 'Answer 5 quiz questions', progress: 40, claimed: false },
  { id: 3, title: 'Earn 100 XP', progress: 100, claimed: false },
]

export default function DailyQuestWidget() {
  const [quests, setQuests] = useState(initialQuests)

  const handleClaim = (id: number) => {
    setQuests((prevQuests) =>
      prevQuests.map((quest) =>
        quest.id === id ? { ...quest, claimed: true } : quest
      )
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto p-4 shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">
          🎯 Daily Quests
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {quests.map((quest) => (
            <div key={quest.id} className="flex items-center justify-between">
              <div className="w-full">
                <p className="font-medium text-sm text-gray-700">
                  {quest.title}
                </p>
                <Progress value={quest.progress} className="mt-2" />
              </div>
              {quest.progress === 100 && quest.claimed ? (
                <Button variant="ghost" className="text-green-500" disabled>
                  <CheckCircle className="mr-2 h-4 w-4" /> Done
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  className="ml-4"
                  onClick={() => handleClaim(quest.id)}
                  disabled={quest.progress < 100 || quest.claimed}
                >
                  Claim
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
