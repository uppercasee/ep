'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const overviewMetrics = [
  { label: 'Total Users', value: '12,540' },
  { label: 'Total Revenue', value: '$240,000' },
  { label: 'Active Courses', value: '340' },
  { label: 'Pending Approvals', value: '12' },
  { label: 'Total Lessons', value: '4,200' },
  { label: 'Completed Courses', value: '1,890' },
  { label: 'New Signups This Month', value: '720' },
  { label: 'Active Teachers', value: '150' },
]

const userActivity = [
  {
    name: 'Alice Johnson',
    action: 'Enrolled in JavaScript Basics',
    time: '2h ago',
  },
  {
    name: 'John Doe',
    action: 'Completed Python for Beginners',
    time: '5h ago',
  },
  { name: 'Emma Brown', action: 'Joined the platform', time: '1 day ago' },
  {
    name: 'Michael Lee',
    action: 'Published a new course: React Mastery',
    time: '3 days ago',
  },
  {
    name: 'Sophia White',
    action: 'Earned a certificate in Data Science',
    time: '5 days ago',
  },
]

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Admin Dashboard</h2>

      {/* Overview Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {overviewMetrics.map((metric) => (
          <Card key={metric.label} className="p-4">
            <h4 className="text-sm font-medium">{metric.label}</h4>
            <p className="text-xl font-semibold">{metric.value}</p>
          </Card>
        ))}
      </div>

      {/* Recent User Activity */}
      <Card className="p-4">
        <h4 className="font-semibold mb-4">Recent Activity</h4>
        {userActivity.map((activity) => (
          <div key={activity.name} className="flex items-center space-x-3 py-2">
            <Avatar>
              <AvatarImage src="/images/avatar-placeholder.png" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{activity.name}</p>
              <p className="text-xs text-gray-500">
                {activity.action} - {activity.time}
              </p>
            </div>
          </div>
        ))}
      </Card>

      {/* Action Buttons */}
      <Card className="p-4">
        <div className="flex space-x-4">
          <Button variant="outline" className="w-full">
            Manage Users
          </Button>
          <Button className="w-full">Approve Courses</Button>
          <Button className="w-full">View Reports</Button>
          <Button className="w-full">Settings</Button>
        </div>
      </Card>
    </div>
  )
}
