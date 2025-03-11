'use server'

import { db } from '@/drizzle/db'
import { ContentTable } from '@/drizzle/schema'
import { and, eq } from 'drizzle-orm'

/**
 * Fetches all content for a specific course.
 * @param courseId - The ID of the course.
 * @returns An array of content objects for the course.
 */
export async function getContent(courseId: string) {
  try {
    const content = await db
      .select()
      .from(ContentTable)
      .where(eq(ContentTable.courseId, courseId))
      .execute()

    console.log(content)
    return content
  } catch (error) {
    console.error('Error fetching content:', error)
    throw new Error('Failed to fetch content for the course.')
  }
}

export async function deleteContent(resourceId: string) {
  try {
    const deleteResult = await db
      .delete(ContentTable)
      .where(eq(ContentTable.id, resourceId))

    if (deleteResult.rowCount === 0) {
      throw new Error('Content not found or already deleted.')
    }
  } catch (error) {
    console.error('Failed to delete content:', error)
    throw new Error('Could not delete content. Please try again.')
  }
}
