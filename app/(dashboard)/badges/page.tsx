'use client'

import { Button } from '@/components/ui/button'
import {
  Award,
  CheckCircle,
  Flag,
  Heart,
  Lightbulb,
  Shield,
  Star,
  Trophy,
} from 'lucide-react'

const BadgesPage = () => {
  // Hardcoded badge data with progression (e.g., unlocked, in-progress)
  const badges = [
    { name: 'Beginner', icon: <CheckCircle />, progress: 0, status: 'Locked' },
    { name: 'Course Completer', icon: <Star />, progress: 0, status: 'Locked' },
    { name: 'Top Scorer', icon: <Award />, progress: 0, status: 'Locked' },
    {
      name: 'Master Learner',
      icon: <Lightbulb />,
      progress: 0,
      status: 'Locked',
    },
    { name: 'Course Creator', icon: <Trophy />, progress: 0, status: 'Locked' },
    {
      name: 'Challenge Conqueror',
      icon: <Shield />,
      progress: 0,
      status: 'Locked',
    },
    {
      name: 'Learning Enthusiast',
      icon: <Heart />,
      progress: 0,
      status: 'Locked',
    },
    { name: 'Global Explorer', icon: <Flag />, progress: 0, status: 'Locked' },
    { name: 'Quiz Master', icon: <Star />, progress: 0, status: 'Locked' },
    { name: 'Fast Learner', icon: <Award />, progress: 0, status: 'Locked' },
    {
      name: 'Creative Thinker',
      icon: <Lightbulb />,
      progress: 0,
      status: 'Locked',
    },
    {
      name: 'Academic Leader',
      icon: <Trophy />,
      progress: 0,
      status: 'Locked',
    },
  ]

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Badges</h1>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-6">
        {badges.map((badge, index) => (
          <div
            key={badge.name}
            className="p-4 rounded-lg shadow-lg flex flex-col gap-4 border border-gray-200"
          >
            <div className="flex items-center gap-4">
              <div className="text-xl text-blue-500">{badge.icon}</div>
              <div>
                <h3 className="text-lg font-semibold">{badge.name}</h3>
                <p
                  className={`text-sm ${badge.status === 'Unlocked' ? 'text-green-500' : 'text-gray-500'}`}
                >
                  {badge.status}
                </p>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${
                  badge.status === 'Unlocked'
                    ? 'bg-green-500'
                    : badge.status === 'In Progress'
                      ? 'bg-yellow-500'
                      : 'bg-gray-300'
                }`}
                style={{ width: `${badge.progress}%` }}
              />
            </div>

            <Button variant="outline" size="sm" className="self-start">
              View Details
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BadgesPage
