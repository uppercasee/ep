import type { ReactNode } from 'react'

type Role = 'teacher' | 'student'
type User = { id: string; roles: Role[] }

type Course = {
  id: string
  title: string
  description: string
  createdBy: string
}

type PermissionCheck<Key extends keyof Permissions> =
  | boolean
  | ((user: User, data: Permissions[Key]['dataType']) => boolean)

type RolesWithPermissions = {
  [R in Role]: Partial<{
    [Key in keyof Permissions]: Partial<{
      [Action in Permissions[Key]['action']]: PermissionCheck<Key>
    }>
  }>
}

type Permissions = {
  courses: {
    dataType: Course
    action: 'create' | 'edit' | 'delete'
  }
}
const ROLES = {
  teacher: {
    courses: {
      create: true,
      edit: (user, course) => course.createdBy === user.id,
      delete: (user, course) => course.createdBy === user.id,
    },
  },
  student: {
    courses: {
      create: false,
      edit: false,
      delete: false,
    },
  },
} as const satisfies RolesWithPermissions

export function hasPermission<Resource extends keyof Permissions>(
  user: User,
  resource: Resource,
  action: Permissions[Resource]['action'],
  data?: Permissions[Resource]['dataType']
) {
  return user.roles.some((role) => {
    const permission = (ROLES as RolesWithPermissions)[role][resource]?.[action]
    if (permission == null) return false

    if (typeof permission === 'boolean') return permission
    return data != null && permission(user, data)
  })
}

// Define the props for the component
type PermissionProps<Resource extends keyof Permissions> = {
  user: User
  resource: Resource
  action: Permissions[Resource]['action']
  data?: Permissions[Resource]['dataType']
  children: ReactNode
}

export function Permission<Resource extends keyof Permissions>({
  user,
  resource,
  action,
  data,
  children,
}: PermissionProps<Resource>) {
  const isAllowed = hasPermission(user, resource, action, data)
  return isAllowed ? { children } : null
}
//
//
// USAGE:
//
//
const teacherUser: User = { id: 'teacher1', roles: ['teacher'] }
const studentUser: User = { id: 'student1', roles: ['student'] }
const course: Course = {
  id: 'course1',
  title: 'Math 101',
  description: 'Basic Math Course',
  createdBy: 'teacher1',
}

// Teacher can create a course
console.log(hasPermission(teacherUser, 'courses', 'create')) // true

// Teacher can edit their own course
console.log(hasPermission(teacherUser, 'courses', 'edit', course)) // true

// Teacher cannot edit someone else's course
console.log(
  hasPermission(
    { id: 'teacher2', roles: ['teacher'] },
    'courses',
    'edit',
    course
  )
) // false

// Student cannot create a course
console.log(hasPermission(studentUser, 'courses', 'create')) // false

// Student cannot edit a course
console.log(hasPermission(studentUser, 'courses', 'edit', course)) // false

// Teacher can delete their own course
console.log(hasPermission(teacherUser, 'courses', 'delete', course)) // true

// Teacher cannot delete someone else's course
console.log(
  hasPermission(
    { id: 'teacher2', roles: ['teacher'] },
    'courses',
    'delete',
    course
  )
) // false
