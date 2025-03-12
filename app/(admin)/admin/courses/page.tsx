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
import { useQuery } from '@tanstack/react-query'
import { getCoursesAdmin } from './getcourse'

export default function AdminCourses() {
  const {
    data: courses,
    isLoading,
    error,
  } = useQuery(['admin-users'], getCoursesAdmin)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading users</p>
  if (!courses) return <p>No courses found</p>

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Manage Courses</h2>

      {/* Courses Table */}
      <Card className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Course</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>isPublished</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.category}</TableCell>
                <TableCell>{course.price}</TableCell>
                <TableCell>{course.ispublished ? 'Yes' : 'No'}</TableCell>
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
