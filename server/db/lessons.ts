'use server'

import { db } from '@/drizzle/db'
import { LessonsTable } from '@/drizzle/schema'
import { current_user } from '@/lib/server-utils'
import { and, eq, gt } from 'drizzle-orm'

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
interface GetLessonFromIdProps {
  lessonId: string
}

export async function getLessonFromId({ lessonId }: GetLessonFromIdProps) {
  try {
    const lesson = await db
      .select()
      .from(LessonsTable)
      .where(eq(LessonsTable.id, lessonId))
      .limit(1)

    return lesson
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : `Could not fetch lesson for id: ${lessonId}`
    )
  }
}

export async function createNewLesson(data: typeof LessonsTable.$inferInsert) {
  const user = await current_user()

  if (!user?.id) {
    throw new Error('Not Authorized')
  }

  try {
    const [newLesson] = await db
      .insert(LessonsTable)
      .values(data)
      .returning({ insertedId: LessonsTable.id })

    console.log('Lesson Created!!')
    return newLesson.insertedId
  } catch (err) {
    console.error('Error creating lesson:', err)
    throw new Error('Error occurred while creating lesson')
  }
}

interface deleteLessonFromPositionProps {
  position: number
  courseId: string
}

export async function deleteLessonFromPosition({
  position,
  courseId,
}: deleteLessonFromPositionProps) {
  const user = await current_user()

  if (!user?.id) {
    throw new Error('Not Authorized')
  }

  try {
    // Step 1: Delete the specified lesson
    const deleteResult = await db
      .delete(LessonsTable)
      .where(
        and(
          eq(LessonsTable.position, position),
          eq(LessonsTable.courseId, courseId)
        )
      )

    if (deleteResult.rowCount === 0) {
      throw new Error('Lesson not found or already deleted.')
    }

    // Step 2: Fetch lessons with positions greater than the deleted lesson
    const lessonsToUpdate = await db
      .select()
      .from(LessonsTable)
      .where(
        and(
          gt(LessonsTable.position, position),
          eq(LessonsTable.courseId, courseId)
        )
      )

    // Step 3: Update the position of each lesson
    for (const lesson of lessonsToUpdate) {
      await db
        .update(LessonsTable)
        .set({ position: lesson.position - 1 })
        .where(eq(LessonsTable.id, lesson.id))
    }
  } catch (error) {
    console.error('Failed to delete lesson:', error)
    throw new Error('Could not delete lesson. Please try again.')
  }
}
