'use server'

import { db } from '@/drizzle/db'
import { QuestTable } from '@/drizzle/schema'
import { current_user } from '@/lib/server-utils'
import { getUserId } from '@/server/db/users'
import { and, eq } from 'drizzle-orm'

type QuestType = 'lessons_completed' | 'quiz_answers' | 'xp_earned'

const DAILY_QUESTS: { questType: QuestType; title: string; target: number }[] =
  [
    { questType: 'lessons_completed', title: 'Complete 3 lessons', target: 3 },
    { questType: 'quiz_answers', title: 'Answer 5 quiz questions', target: 5 },
    { questType: 'xp_earned', title: 'Earn 100 XP', target: 100 },
  ]

export async function fetchDailyQuests() {
  const user = await current_user()

  if (!user?.id) {
    throw new Error('Not Authorized')
  }

  const userId = await getUserId(user.id)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const expiresAt = new Date(today)
  expiresAt.setHours(23, 59, 59, 999)

  console.log(today, expiresAt)

  const quests = await db
    .select()
    .from(QuestTable)
    .where(
      and(eq(QuestTable.userId, userId), eq(QuestTable.expiresAt, expiresAt))
    )

  console.log(quests)

  if (quests.length > 0) {
    return quests // Return immediately if quests exist
  }

  // If no quests, generate them and return the newly inserted ones
  return await generateDailyQuests(userId)
}

async function generateDailyQuests(userId: string) {
  const expiresAt = new Date()
  expiresAt.setHours(23, 59, 59, 999)

  const quests = DAILY_QUESTS.map((q) => ({
    userId,
    questType: q.questType,
    title: q.title,
    target: q.target,
    progress: 0,
    claimed: false,
    expiresAt,
  }))

  console.log(quests)

  await db.insert(QuestTable).values(quests)

  const newQuest = await db
    .select()
    .from(QuestTable)
    .where(
      and(eq(QuestTable.userId, userId), eq(QuestTable.expiresAt, expiresAt))
    )

  console.log(newQuest)
  return newQuest
}
