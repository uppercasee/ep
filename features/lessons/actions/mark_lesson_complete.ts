'use server'

import { db } from '@/drizzle/db'
import { UserLessonsTable, UsersTable } from '@/drizzle/schema'
import { setQuest } from '@/features/quests/actions/setQuest'
import { current_user } from '@/lib/server-utils'
import { getUserId } from '@/server/db/users'
import { and, eq } from 'drizzle-orm'

export async function markLessonComplete(lessonId: string | null) {
  const user = await current_user()

  if (!user?.id) {
    throw new Error('User is not authenticated')
  }

  if (!lessonId) {
    throw new Error('LessonId is required.')
  }

  const userId = await getUserId(user.id)

  try {
    await db
      .update(UserLessonsTable)
      .set({ isCompleted: true, updatedAt: new Date() })
      .where(
        and(
          eq(UserLessonsTable.userId, userId),
          eq(UserLessonsTable.lessonId, lessonId)
        )
      )

    // Retrieve the current XP value
    const currentUser = await db
      .select()
      .from(UsersTable)
      .where(eq(UsersTable.id, userId))
      .limit(1)
      .execute()

    // update the xp value
    if (currentUser.length > 0) {
      const currentXp = currentUser[0].xp || 0
      const currentTime = new Date()

      await db
        .update(UsersTable)
        .set({
          xp: currentXp + 25,
          lastXpUpdate: currentTime,
        })
        .where(eq(UsersTable.id, userId))
    }

    const questLog = await setQuest('lessons_completed', 1)
    const xpLog = await setQuest('xp_earned', 25)

    console.log(questLog, xpLog)
    console.log(`Lesson ${lessonId} marked as complete for user ${user.id}`)
  } catch (error) {
    console.error('Error updating lesson completion:', error)
    throw new Error('Failed to mark lesson as complete')
  }
}
