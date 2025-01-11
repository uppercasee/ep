'use server'

import { currentUser } from '@clerk/nextjs/server'
import type { Types } from 'mongoose'
import type { z } from 'zod'
import Course, { type ICourse } from '../db/models/courses'
import User from '../db/models/users'
import connectToDatabase from '../db/mongoose'
import type { courseZodSchema } from '../db/schema/courseSchema'
import type { userZodSchema } from '../db/schema/userSchema'

type CreateCourseParams = z.infer<typeof courseZodSchema>

export async function createCourse(
  courseData: Omit<CreateCourseParams, 'createdBy' | 'students' | 'isPublished'>
): Promise<ICourse> {
  await connectToDatabase()

  const user = await currentUser()
  const user_id = user?.id

  const db_user = await User.findOne({ id: user_id })

  try {
    const newCourse = new Course({
      ...courseData,
      createdBy: db_user._id,
    })

    await User.findOneAndUpdate(
      { id: user_id },
      { $push: { myCourses: newCourse._id } },
      { new: true }
    )

    await newCourse.save()
    console.log('Course Created!!')

    console.log(newCourse._id.toString())

    return newCourse._id.toString()
  } catch (err) {
    console.error('Error creating course:', err)
    throw new Error('Error occurred while creating course')
  }
}

export async function GetAllCreatedCourses(): Promise<
  (z.infer<typeof courseZodSchema> & { _id: Types.ObjectId })[]
> {
  await connectToDatabase()

  const user = await currentUser()
  const user_id = user?.id

  const db_user = await User.findOne({ id: user_id }).populate('myCourses')

  if (!db_user) {
    throw new Error('User not found')
  }

  const courses = db_user.myCourses || []
  return courses
}

export async function GetAllCourses(): Promise<
  (z.infer<typeof courseZodSchema> & { _id: Types.ObjectId })[]
> {
  await connectToDatabase()

  const courses = await Course.find()
  return courses
}
