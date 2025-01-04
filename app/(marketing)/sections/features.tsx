import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const features = [
  {
    id: 1,
    title: 'Earn Rewards',
    content:
      'Gain points, badges, and certificates as you complete lessons and progress through your courses!',
  },
  {
    id: 2,
    title: 'Learn with Fun',
    content:
      'Our interactive quizzes and challenges keep you engaged while you learn new skills.',
  },
  {
    id: 3,
    title: 'Track Your Progress',
    content:
      'Monitor your learning journey with personalized progress tracking and performance analytics.',
  },
  {
    id: 4,
    title: 'Track Your Progress',
    content:
      'Monitor your learning journey with personalized progress tracking and performance analytics.',
  },
]

const Features = () => {
  return (
    <div className="mx-16 h-screen md:h-auto">
      <div className="my-4 flex items-center justify-center">
        <h2 className="text-4xl font-extrabold leading-tight">Features</h2>
      </div>
      <div className="mx-16 my-2 flex h-auto flex-col gap-8 md:flex-row">
        {features.map((features) => (
          <Card
            key={features.id}
            className="transition-all duration-300 hover:scale-105 hover:border hover:border-gray-300"
          >
            <CardHeader>
              <CardTitle>{features.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">{features.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Features
