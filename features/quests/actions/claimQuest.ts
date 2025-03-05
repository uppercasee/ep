'use server'

import { db } from '@/drizzle/db'
import { QuestTable } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function claimQuest(questId: string) {
  const result = await db
    .update(QuestTable)
    .set({ claimed: true })
    .where(eq(QuestTable.id, questId))

  console.log(result)
  return true
}
