'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Progress } from '@/components/ui/progress'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const chartData = [
  {
    month: 'January',
    revenue: 5000,
    enrollments: 120,
    satisfaction: 4.2,
    completion: 80,
  },
  {
    month: 'February',
    revenue: 7000,
    enrollments: 150,
    satisfaction: 4.3,
    completion: 85,
  },
  {
    month: 'March',
    revenue: 8000,
    enrollments: 170,
    satisfaction: 4.5,
    completion: 88,
  },
  {
    month: 'April',
    revenue: 6500,
    enrollments: 140,
    satisfaction: 4.1,
    completion: 76,
  },
  {
    month: 'May',
    revenue: 9000,
    enrollments: 180,
    satisfaction: 4.7,
    completion: 92,
  },
  {
    month: 'June',
    revenue: 11000,
    enrollments: 200,
    satisfaction: 4.8,
    completion: 95,
  },
]

const chartConfig = {
  revenue: {
    label: 'Revenue ($)',
  },
  enrollments: {
    label: 'Enrollments',
  },
  satisfaction: {
    label: 'Satisfaction',
  },
  completion: {
    label: 'Completion Rate (%)',
  },
}

const feedbackData = [
  { student: 'Alice', feedback: 'The course was very helpful!', rating: 5 },
  { student: 'Bob', feedback: 'Clear and concise explanations.', rating: 4 },
  {
    student: 'Charlie',
    feedback: 'Great pace, but more examples would help.',
    rating: 3,
  },
]

export default function TeacherAnalytics() {
  return (
    <div className="p-6 shadow rounded-lg space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Teacher Analytics</h2>
      {/* Teacher Profile */}
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src="/images/teacher-avatar.jpg" alt="Teacher Avatar" />
          <AvatarFallback>TA</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-semibold">John Doe</h3>
          <p className="text-sm">Senior Instructor</p>
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow rounded-lg p-4">
          <h4 className="text-sm font-medium">Total Revenue</h4>
          <p className="text-xl font-semibold">$45,000</p>
        </Card>
        <Card className="shadow rounded-lg p-4">
          <h4 className="text-sm font-medium">Total Enrollments</h4>
          <p className="text-xl font-semibold">1,250</p>
        </Card>
        <Card className="shadow rounded-lg p-4">
          <h4 className="text-sm font-medium">Average Satisfaction</h4>
          <p className="text-xl font-semibold">4.6/5</p>
        </Card>
        <Card className="shadow rounded-lg p-4">
          <h4 className="text-sm font-medium">Course Completion</h4>
          <p className="text-xl font-semibold">89%</p>
        </Card>
      </div>

      {/* Feedback Section */}
      <Card className="shadow rounded-lg p-4">
        <h4 className="font-semibold">Recent Student Feedback</h4>
        {feedbackData.map((feedback, index) => (
          <Card key={feedback.student} className="p-4 shadow rounded-lg my-4">
            <div className="flex items-center space-x-3">
              <p className="font-semibold">{feedback.student}</p>
              <p className="text-sm">Rating: {feedback.rating} / 5</p>
            </div>
            <p className="mt-2">{feedback.feedback}</p>
          </Card>
        ))}
      </Card>

      {/* Performance Chart */}
      <Card className="shadow rounded-lg p-4">
        <ChartContainer config={chartConfig} className="max-h-[400px] w-full">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend content={<ChartLegendContent />} />
              <Bar dataKey="revenue" radius={4} />
              <Bar dataKey="enrollments" radius={4} />
              <Bar dataKey="satisfaction" radius={4} />
              <Bar dataKey="completion" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Card>

      {/* Progress Bars for Monthly Performance */}
      <div className="space-y-4">
        <div>
          <h4 className="font-medium">Satisfaction Improvement</h4>
          <Progress value={85} />
        </div>
        <div>
          <h4 className="font-medium">Completion Rate Goal</h4>
          <Progress value={92} />
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button variant="outline" className="w-full">
          Export Data
        </Button>
        <Button className="w-full">Upgrade Plan</Button>
      </div>
    </div>
  )
}
