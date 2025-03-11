'use server'

import { db } from '@/drizzle/db'
import { CoursesTable, UsersTable } from '@/drizzle/schema'
import { current_user } from '@/lib/server-utils'
import { eq } from 'drizzle-orm'
import { getUserId } from '../db/users'

export async function createNewCourse(
  data: Omit<typeof CoursesTable.$inferInsert, 'createdBy'>
) {
  const user = await current_user()

  if (!user?.id) {
    throw new Error('Not Authorized')
  }

  try {
    const userId = await getUserId(user.id)
    const [newCourse] = await db
      .insert(CoursesTable)
      .values({
        ...data,
        createdBy: userId,
      })
      .returning({ insertedId: CoursesTable.id })

    console.log('Course Created!!')
    return newCourse.insertedId
  } catch (err) {
    console.error('Error creating course:', err)
    throw new Error('Error occurred while creating course')
  }
}

export async function GetAllCreatedCourses() {
  const user = await current_user()
  if (!user?.id) {
    throw new Error('Not Authorized')
  }

  try {
    // const userId = await getUserId(user.id)
    const UserCourses = await db
      .select()
      .from(CoursesTable)
      .fullJoin(UsersTable, eq(CoursesTable.createdBy, UsersTable.id))
      .where(eq(UsersTable.clerkUserId, user.id))

    // Filter out records where `courses` is null
    const validCourses = UserCourses.filter((record) => record.courses !== null)
    if (validCourses.length === 0) {
      return []
    }

    return validCourses.map((record) => ({
      ...record.courses,
      id: record.courses?.id.toString(),
    }))
  } catch (error) {
    console.error('Error fetching courses created by user:', error)
    throw new Error('Error occurred while fetching courses created by user')
  }
}

export async function GetAllCourses() {
  try {
    const courses = await db
      .select()
      .from(CoursesTable)
      .where(eq(CoursesTable.isPublished, true))

    return courses.map((course) => ({
      ...course,
      id: course.id.toString(),
    }))
  } catch (error) {
    console.error('Error fetching courses:', error)
    throw new Error('Error occurred while fetching courses')
  }
}
export async function getCourse(id: string) {
  const course = await db
    .select()
    .from(CoursesTable)
    .where(eq(CoursesTable.id, id))
    .limit(1)
    .execute()

  if (!course.length) {
    throw new Error('Course not found')
  }

  return course[0]
}
