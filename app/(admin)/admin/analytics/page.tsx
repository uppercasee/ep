'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const analyticsData = {
  totalUsers: 5000,
  activeUsers: 3200,
  totalCourses: 150,
  totalRevenue: '$250,000',
  avgCompletionRate: 85,
  avgSatisfaction: 4.6,
}

const recentActivity = [
  { id: 1, activity: 'New user registered', timestamp: '2 hours ago' },
  {
    id: 2,
    activity: 'Course "React Basics" was completed by 10 students',
    timestamp: '1 day ago',
  },
  {
    id: 3,
    activity: 'Instructor John Doe published a new course',
    timestamp: '3 days ago',
  },
  { id: 4, activity: 'System maintenance performed', timestamp: '1 week ago' },
]

export default function AdminAnalytics() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Admin Analytics</h2>

      {/* Overview Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(analyticsData).map(([key, value]) => (
          <Card key={key} className="p-4">
            <h4 className="text-sm font-medium capitalize">
              {key.replace(/([A-Z])/g, ' $1')}
            </h4>
            <p className="text-xl font-semibold">{value}</p>
          </Card>
        ))}
      </div>

      {/* Progress Bars */}
      <div className="space-y-4">
        <div>
          <h4 className="font-medium">Average Course Completion</h4>
          <Progress value={analyticsData.avgCompletionRate} />
        </div>
        <div>
          <h4 className="font-medium">Average Student Satisfaction</h4>
          <Progress value={(analyticsData.avgSatisfaction / 5) * 100} />
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="p-4">
        <h4 className="text-lg font-semibold mb-4">Recent Activity</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Activity</TableCell>
              <TableCell>Timestamp</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentActivity.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.activity}</TableCell>
                <TableCell>{activity.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button variant="outline" className="w-full">
          Download Report
        </Button>
        <Button className="w-full">Manage Users</Button>
      </div>
    </div>
  )
}
