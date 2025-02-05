'use server'

import { db } from '@/drizzle/db'
import { CoursesTable } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function updateCoursePublishedStatus(
  courseId: string,
  isPublished: boolean
) {
  await db
    .update(CoursesTable)
    .set({ isPublished })
    .where(eq(CoursesTable.id, courseId))
}
