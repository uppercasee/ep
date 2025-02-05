// app/actions.ts
'use server'

import { db } from '@/drizzle/db'
import { ContentTable } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function uploadVideo(
  prevState: { success: boolean; message: string; videoUrl: string },
  formData: FormData
) {
  console.log(formData)
  try {
    const courseId = formData.get('courseId') as string
    const resourceId = formData.get('resourceId') as string
    const title = formData.get('title') as string
    const videoUrl = formData.get('videoUrl') as string
    console.log(courseId, title, videoUrl)

    const existingResource = await db
      .select()
      .from(ContentTable)
      .where(eq(ContentTable.id, resourceId))
      .execute()

    if (existingResource.length > 0) {
      // Update existing resource
      await db
        .update(ContentTable)
        .set({ title, url: videoUrl })
        .where(eq(ContentTable.id, resourceId))
        .execute()
    } else {
      // Insert new resource
      await db
        .insert(ContentTable)
        .values({
          type: 'video',
          title,
          url: videoUrl,
          courseId,
        })
        .execute()
    }

    return {
      success: true,
      message: 'Video uploaded and saved successfully!',
      videoUrl,
    }
  } catch (error) {
    console.error('Error saving video metadata:', error)
    return {
      success: false,
      message: 'Failed to save video metadata.',
      videoUrl: '',
    }
  }
}
