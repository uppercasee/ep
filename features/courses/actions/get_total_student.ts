'use server'

import { db } from '@/drizzle/db'
import { CoursesTable, UserCoursesTable } from '@/drizzle/schema'
import { current_user } from '@/lib/server-utils'
import { getUserId } from '@/server/db/users'
import { count, eq, inArray } from 'drizzle-orm'

export const get_total_students = async () => {
  const user_data = await current_user()

  if (!user_data?.id) {
    throw new Error('Not Authorized')
  }
  const user_id = await getUserId(user_data.id)

  try {
    const courses = await db
      .select({ courseId: CoursesTable.id })
      .from(CoursesTable)
      .where(eq(CoursesTable.createdBy, user_id))

    const courseIds = courses.map((course) => course.courseId)

    if (courseIds.length === 0) {
      return 0
    }

    const studentCount = await db
      .select({ total: count() })
      .from(UserCoursesTable)
      .where(inArray(UserCoursesTable.courseId, courseIds))

    console.log(studentCount)
    return studentCount[0]?.total ?? 0
  } catch (error) {
    console.error('Error fetching total students:', error)
    throw new Error('Error fetching total students')
  }
}
