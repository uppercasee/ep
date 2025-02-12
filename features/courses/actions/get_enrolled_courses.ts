'use server'

import { db } from '@/drizzle/db'
import {
  CoursesTable,
  LessonsTable,
  PaymentTable,
  UserCoursesTable,
  UserLessonsTable,
} from '@/drizzle/schema'
import { current_user } from '@/lib/server-utils'
import { getUserId } from '@/server/db/users'
import { eq } from 'drizzle-orm'

export const getAllEnrolledCourses = async () => {
  const user = await current_user()

  if (!user?.id) {
    throw new Error('Not Authorized')
  }

  const userId = await getUserId(user.id)

  try {
    const enrolledCourses = await db
      .select({
        courseId: CoursesTable.id,
      })
      .from(UserCoursesTable)
      .innerJoin(CoursesTable, eq(CoursesTable.id, UserCoursesTable.courseId))
      .where(eq(UserCoursesTable.userId, userId))

    if (enrolledCourses.length === 0) {
      return []
    }

    const courses = await Promise.all(
      enrolledCourses.map(async (course) => {
        const courseDetails = await db
          .select()
          .from(CoursesTable)
          .where(eq(CoursesTable.id, course.courseId))

        return courseDetails
      })
    )

    return courses.flat()
  } catch (error) {
    console.error('Error fetching enrolled courses:', error)
    throw new Error('Failed to fetch enrolled courses')
  }
}
