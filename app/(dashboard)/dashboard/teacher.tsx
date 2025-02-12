import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GetAllCreatedCourses } from '@/server/actions/courseActions'
import { BookOpen, Clock, PlusCircle, Star, Users } from 'lucide-react'
import Link from 'next/link'

export default async function TeacherDashboard() {
  // total student
  //
  // total course
  //
  // courses
  // const student = await getTotalStudent()
  const all_course = await GetAllCreatedCourses()
  console.log(all_course)

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

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
        <Link href={'/courses/create'}>
          <Button className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5" />
            Create Course
          </Button>
        </Link>
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
            <BookOpen className="w-6 h-6 text-primary" /> {all_course.length}
          </CardContent>
        </Card>

        {/* <Card> */}
        {/*   <CardHeader> */}
        {/*     <CardTitle>Average Rating</CardTitle> */}
        {/*   </CardHeader> */}
        {/*   <CardContent className="flex items-center gap-4 text-lg font-semibold"> */}
        {/*     <BarChart2 className="w-6 h-6 text-primary" /> 4.7 ⭐ */}
        {/*   </CardContent> */}
        {/* </Card> */}
      </div>

      <h2 className="text-xl font-semibold">Your Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((all_course) => (
          <Card key={all_course.id}>
            <CardHeader>
              <CardTitle>{all_course.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Students: {all_course.students}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {all_course.duration}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
