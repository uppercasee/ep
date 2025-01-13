'use server'

import { db } from '@/drizzle/db'
import { LessonsTable } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

interface getLessonsFromCourseProps {
  courseId: string
}

export async function getLessonsFromCourse({
  courseId,
}: getLessonsFromCourseProps) {
  try {
    const lessons = await db
      .select()
      .from(LessonsTable)
      .where(eq(LessonsTable.courseId, courseId))
      .orderBy(LessonsTable.position)

    return lessons
  } catch (error) {
    console.error('Error fetching lessons:', error)
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Could not fetch lessons for the course.'
    )
  }
}
