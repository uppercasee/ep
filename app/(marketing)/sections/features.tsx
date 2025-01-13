import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const features = [
  {
    id: 1,
    title: 'Earn Rewards',
    content:
      'Earn points, badges, and certificates as you progress through lessons and complete key milestones.',
  },
  {
    id: 2,
    title: 'Learn with Fun',
    content:
      'Interactive quizzes and challenges make learning enjoyable while helping you develop new skills.',
  },
  {
    id: 3,
    title: 'Track Your Progress',
    content:
      'Easily monitor your progress with personalized tracking, performance insights, and analytics tools.',
  },
  {
    id: 4,
    title: 'Compete with Peers',
    content:
      'Join leaderboards and challenges to compete with peers, and track how you rank within the community.',
  },
]

const Features = () => {
  return (
    <div className="md:mx-16 h-auto">
      <div className="my-4 flex items-center justify-center">
        <h2 className="text-4xl font-extrabold leading-tight">Features</h2>
      </div>
      <div className="mx-4 md:mx-4 my-2 flex h-auto flex-col gap-8 lg:flex-row">
        {features.map((features) => (
          <Card
            key={features.id}
            className="transition-all duration-300 hover:scale-105 hover:border hover:border-gray-300 bg-background"
          >
            <CardHeader>
              <CardTitle>{features.title}</CardTitle>
            </CardHeader>
            <CardContent className="overflow-hidden">
              <p className="text-sm text-gray-500">{features.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Features
