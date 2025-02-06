'use server'

import { db } from '@/drizzle/db'
import { ContentTable } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function updateLessonContent(lessonId: string, contentId: string) {
  console.log(lessonId, contentId)
  const content = await db
    .update(ContentTable)
    .set({ lessonId })
    .where(eq(ContentTable.id, contentId))

  return true
}
