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

const users = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'Student',
    status: 'Active',
    coursesEnrolled: 5,
    lastLogin: '2025-02-08',
    avatar: '/images/alice.jpg',
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Instructor',
    status: 'Pending',
    coursesCreated: 3,
    lastLogin: '2025-02-07',
    avatar: '/images/john.jpg',
  },
  {
    id: 3,
    name: 'Emma Brown',
    email: 'emma@example.com',
    role: 'Admin',
    status: 'Active',
    coursesManaged: 12,
    lastLogin: '2025-02-09',
    avatar: '/images/emma.jpg',
  },
  {
    id: 4,
    name: 'Michael Lee',
    email: 'michael@example.com',
    role: 'Student',
    status: 'Suspended',
    coursesEnrolled: 2,
    lastLogin: '2025-02-05',
    avatar: '/images/michael.jpg',
  },
]

export default function AdminUsers() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Manage Users</h2>

      {/* Users Table */}
      <Card className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Login</TableCell>
              <TableCell>Courses</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>{user.lastLogin}</TableCell>
                <TableCell>
                  {user.coursesEnrolled ||
                    user.coursesCreated ||
                    user.coursesManaged}
                </TableCell>
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
