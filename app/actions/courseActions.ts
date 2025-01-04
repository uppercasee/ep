'use server'
import Course from '@/db/models/courses'
import connectToDatabase from '@/db/mongoose'
import { currentUser } from '@clerk/nextjs/server'

import { Document } from 'mongoose'

export async function createCourse(
  title: string,
  description: string
): Promise<Document> {
  const user = await currentUser()
  const id = user?.id

  await connectToDatabase()
  try {
    const newCourse = new Course({
      title,
      description,
      id,
    })
    await newCourse.save()
    console.log(`Course Created!!`)
    return newCourse
  } catch (err) {
    console.error('Error creating course:', err)
    throw new Error('Error occurred while creating course')
  }
}
