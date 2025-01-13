'use server'

import { type Course, type User, db } from '@/drizzle/db'
import { CoursesTable, UsersTable } from '@/drizzle/schema'
import { getUserFromClerkId, getUserId } from '@/server/db/users'
import { eq } from 'drizzle-orm'

export type Role = 'teacher' | 'student'

export type PermissionCheck<Key extends keyof Permissions> =
  | boolean
  | ((user: User, data: Permissions[Key]['dataType']) => boolean)

export type RolesWithPermissions = {
  [R in Role]: Partial<{
    [Key in keyof Permissions]: Partial<{
      [Action in Permissions[Key]['action']]: PermissionCheck<Key>
    }>
  }>
}

export type Permissions = {
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

export async function hasPermission<Resource extends keyof Permissions>(
  userId: string,
  resource: Resource,
  action: Permissions[Resource]['action'],
  dataId?: string
): Promise<boolean> {
  const user = await getUserFromClerkId(userId)

  if (!user) return false

  const role = user.role as Role
  if (!role || !(role in ROLES)) return false

  let data: Permissions[Resource]['dataType'] | undefined
  if (resource === 'courses' && dataId) {
    data = await db
      .select()
      .from(CoursesTable)
      .where(eq(CoursesTable.id, dataId))
      .then((courses) => courses[0])
  }

  const permission = ROLES[role]?.[resource]?.[action]
  if (permission == null) return false

  if (typeof permission === 'boolean') return permission
  return data != null && permission(user, data)
}
