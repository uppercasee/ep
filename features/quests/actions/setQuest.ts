import { db } from '@/drizzle/db'
import { QuestTable } from '@/drizzle/schema'
import { and, eq } from 'drizzle-orm'

export async function setQuest(
  questType: 'lessons_completed' | 'quiz_answers' | 'xp_earned',
  value: number
) {
  const quest = await db
    .select()
    .from(QuestTable)
    .where(
      and(eq(QuestTable.questType, questType), eq(QuestTable.claimed, false))
    )
    .orderBy(QuestTable.createdAt)
    .limit(1)
    .execute()

  if (quest.length === 0) {
    throw new Error(`No active quest found for type: ${questType}`)
  }

  const questToUpdate = quest[0]

  const currentProgress = questToUpdate.progress ?? 0
  const newValue = currentProgress + value

  await db
    .update(QuestTable)
    .set({ progress: newValue })
    .where(eq(QuestTable.id, questToUpdate.id))
    .execute()

  return `Quest progress for ${questType} set to ${value}`
}
