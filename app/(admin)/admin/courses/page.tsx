'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const courses = [
  {
    id: 1,
    title: 'JavaScript Basics',
    instructor: 'Alice Johnson',
    category: 'Programming',
    enrollments: 120,
    rating: 4.5,
    status: 'Published',
    avatar: '/images/alice.jpg',
  },
  {
    id: 2,
    title: 'React for Beginners',
    instructor: 'John Doe',
    category: 'Web Development',
    enrollments: 200,
    rating: 4.7,
    status: 'Draft',
    avatar: '/images/john.jpg',
  },
  {
    id: 3,
    title: 'Machine Learning 101',
    instructor: 'Emma Brown',
    category: 'Data Science',
    enrollments: 95,
    rating: 4.3,
    status: 'Published',
    avatar: '/images/emma.jpg',
  },
  {
    id: 4,
    title: 'UI/UX Design Principles',
    instructor: 'Michael Lee',
    category: 'Design',
    enrollments: 80,
    rating: 4.6,
    status: 'Archived',
    avatar: '/images/michael.jpg',
  },
]

export default function AdminCourses() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Manage Courses</h2>

      {/* Courses Table */}
      <Card className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Course</TableCell>
              <TableCell>Instructor</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Enrollments</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.title}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage
                        src={course.avatar}
                        alt={course.instructor}
                      />
                      <AvatarFallback>{course.instructor[0]}</AvatarFallback>
                    </Avatar>
                    <span>{course.instructor}</span>
                  </div>
                </TableCell>
                <TableCell>{course.category}</TableCell>
                <TableCell>{course.enrollments}</TableCell>
                <TableCell>{course.rating} / 5</TableCell>
                <TableCell>{course.status}</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
