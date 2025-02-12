import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Activity,
  BarChart2,
  BookOpen,
  Clock,
  PlusCircle,
  Star,
  Users,
} from 'lucide-react'

export default async function TeacherDashboard() {
  const courses = [
    {
      id: 1,
      title: 'JavaScript Basics',
      students: 120,
      duration: '10h',
      rating: 4.5,
    },
    {
      id: 2,
      title: 'React Advanced',
      students: 85,
      duration: '15h',
      rating: 4.7,
    },
    {
      id: 3,
      title: 'Next.js Mastery',
      students: 45,
      duration: '20h',
      rating: 4.8,
    },
  ]

  const recentActivity = [
    { student: 'Alice Johnson', action: 'Completed JavaScript Basics' },
    { student: 'Bob Smith', action: 'Enrolled in React Advanced' },
    { student: 'Charlie Lee', action: 'Finished Next.js Mastery' },
  ]

  const topStudents = [
    { name: 'Emma Wilson', score: '98%' },
    { name: 'Liam Brown', score: '95%' },
    { name: 'Sophia Martinez', score: '92%' },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
        <Button className="flex items-center gap-2">
          <PlusCircle className="w-5 h-5" />
          Create Course
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Students</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4 text-lg font-semibold">
            <Users className="w-6 h-6 text-primary" /> 250
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Courses</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4 text-lg font-semibold">
            <BookOpen className="w-6 h-6 text-primary" /> {courses.length}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Rating</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4 text-lg font-semibold">
            <BarChart2 className="w-6 h-6 text-primary" /> 4.7 ⭐
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold">Your Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Students: {course.students}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {course.duration}
                </span>
              </div>
              <div className="text-sm font-semibold flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" /> {course.rating} ⭐
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-6">Recent Student Activity</h2>
      <Card>
        <CardContent className="space-y-4 p-4">
          {recentActivity.map((activity, index) => (
            <div
              key={activity.student}
              className="flex items-center gap-3 text-sm p-2 border rounded-lg bg-muted"
            >
              <Activity className="w-5 h-5 text-primary" />
              <span>
                {activity.student} - {activity.action}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mt-6">Top Performing Students</h2>
      <Card>
        <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {topStudents.map((student, index) => (
            <div
              key={student.name}
              className="p-4 border rounded-lg flex flex-col items-center bg-muted"
            >
              <span className="text-lg font-semibold">{student.name}</span>
              <span className="text-sm text-muted-foreground">
                Score: {student.score}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
