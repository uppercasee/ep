'use server'

import { currentUser } from '@clerk/nextjs/server'
import type { z } from 'zod'
import Course, { type ICourse } from '../db/models/courses'
import connectToDatabase from '../db/mongoose'
import type { courseZodSchema } from '../db/schema/courseSchema'

type CreateCourseParams = z.infer<typeof courseZodSchema>

export async function createCourse(
  courseData: Omit<CreateCourseParams, 'createdBy' | 'students' | 'isPublished'>
): Promise<ICourse> {
  const user = await currentUser()
  const id = user?.id

  await connectToDatabase()
  try {
    const newCourse = new Course({
      ...courseData,
      createdBy: id,
    })
    await newCourse.save()
    console.log('Course Created!!')
    return newCourse
  } catch (err) {
    console.error('Error creating course:', err)
    throw new Error('Error occurred while creating course')
  }
}
