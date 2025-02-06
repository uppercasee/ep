'use server'

import { db } from '@/drizzle/db'
import { ContentTable } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

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
