'use server'

import { db } from '@/drizzle/db'
import { CoursesTable } from '@/drizzle/schema'
import { currentUser } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { getUserId } from '../db/users'

export async function createNewCourse(
  data: Omit<typeof CoursesTable.$inferInsert, 'createdBy'>
) {
  const user = await currentUser()
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

    // TODO: update usersTable as well
    // await db
    //   .update(UsersTable)
    //   .set({
    //
    //   })
    //   .where(eq(UsersTable.id, user.id))
    console.log('Course Created!!')
    return newCourse.insertedId
  } catch (err) {
    console.error('Error creating course:', err)
    throw new Error('Error occurred while creating course')
  }
}

export async function GetAllCreatedCourses() {
  const user = await currentUser()
  if (!user?.id) {
    throw new Error('Not Authorized')
  }

  try {
    const userId = await getUserId(user.id)
    const courses = await db
      .select()
      .from(CoursesTable)
      .where(eq(CoursesTable.createdBy, userId))

    return courses.map((course) => ({
      ...course,
      id: course.id.toString(),
    }))
  } catch (error) {
    console.error('Error fetching courses created by user:', error)
    throw new Error('Error occurred while fetching courses created by user')
  }
}

export async function GetAllCourses() {
  try {
    const courses = await db.select().from(CoursesTable)

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
