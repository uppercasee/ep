import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { get_total_students } from '@/features/courses/actions/get_total_student'
import { CldImage } from '@/lib/cloudinary'
import { GetAllCreatedCourses } from '@/server/actions/courseActions'
import { BookOpen, Clock, PlusCircle, Star, Users } from 'lucide-react'
import Link from 'next/link'

export default async function TeacherDashboard() {
  const student = await get_total_students()
  const all_course = await GetAllCreatedCourses()

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
            <Users className="w-6 h-6 text-primary" /> {student}
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
        {all_course.map((course) => (
          <Card key={course.id} className="overflow-hidden shadow-lg">
            <CldImage
              src={course.thumbnailUrl ?? ''}
              alt={course.title ?? 'title'}
              width="200"
              height="200"
              className="w-full"
            />
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {course.title}
              </CardTitle>
              <Badge className="text-xs w-fit">{course.category}</Badge>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-600">
                  NPR {course.price}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
