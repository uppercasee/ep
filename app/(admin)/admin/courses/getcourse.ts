'use server'

import { db } from '@/drizzle/db'
import { CoursesTable, UsersTable } from '@/drizzle/schema'

export async function getCoursesAdmin() {
  try {
    const courses = await db
      .select({
        id: CoursesTable.id,
        title: CoursesTable.title,
        category: CoursesTable.category,
        ispublished: CoursesTable.isPublished,
        price: CoursesTable.price,
      })
      .from(CoursesTable)
      .execute()

    return courses
  } catch (error) {
    console.error('Error fetching Admin Courses...', error)
    throw new Error('Failed to fetch user XP and details')
  }
}
