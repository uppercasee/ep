'use server'

import { db } from '@/drizzle/db'
import { ContentTable } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export const updateResourceTitle = async (
  resourceId: string,
  newTitle: string
) => {
  try {
    const result = await db
      .update(ContentTable)
      .set({
        title: newTitle,
      })
      .where(eq(ContentTable.id, resourceId))

    console.log(result)
    return {
      success: true,
      message: 'Title updated successfully',
    }
  } catch (error) {
    console.error('Error updating resource title:', error)
    return {
      success: false,
      message: 'Failed to update title',
    }
  }
}
