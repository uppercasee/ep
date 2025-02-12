'use server'

import { db } from '@/drizzle/db'
import { LessonsTable, UserLessonsTable } from '@/drizzle/schema'
import { current_user } from '@/lib/server-utils'
import { getUserId } from '@/server/db/users'
import { and, eq, inArray } from 'drizzle-orm'

export async function getUserLessons(courseId: string) {
  const user = await current_user()

  if (!user?.id) {
    throw new Error('User is not authenticated')
  }

  const userId = await getUserId(user.id)

  const lessons = await db
    .select()
    .from(LessonsTable)
    .where(eq(LessonsTable.courseId, courseId))

  const lessonIds = lessons.map((lesson) => lesson.id)

  const userLessonsStatus = await db
    .select()
    .from(UserLessonsTable)
    .where(
      and(
        eq(UserLessonsTable.userId, userId),
        inArray(UserLessonsTable.lessonId, lessonIds)
      )
    )

  const completionStatuses = userLessonsStatus.map((userLesson) => ({
    lessonId: userLesson.lessonId,
    isCompleted: userLesson.isCompleted,
  }))

  console.log(completionStatuses)
  return completionStatuses
}
