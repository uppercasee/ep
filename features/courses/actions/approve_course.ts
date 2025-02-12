'use server'

import { db } from '@/drizzle/db'
import {
  CoursesTable,
  LessonsTable,
  PaymentTable,
  UserCoursesTable,
  UserLessonsTable,
} from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export const approveCourse = async (paymentId: string) => {
  try {
    const payment = await db
      .select()
      .from(PaymentTable)
      .where(eq(PaymentTable.id, paymentId))
      .limit(1)

    if (!payment) {
      throw new Error('Payment not found')
    }

    await db
      .update(PaymentTable)
      .set({
        status: 'success',
      })
      .where(eq(PaymentTable.id, paymentId))

    await db.insert(UserCoursesTable).values({
      userId: payment[0].userId,
      courseId: payment[0].courseId,
      isCompleted: false,
    })

    await trackCourseLessons(payment[0].userId, payment[0].courseId)

    // Return success
    return true
  } catch (error) {
    console.error('Error in course approval:', error)
    throw new Error('Failed to approve course')
  }
}

const trackCourseLessons = async (userId: string, courseId: string) => {
  try {
    const lessons = await db
      .select()
      .from(LessonsTable)
      .where(eq(LessonsTable.courseId, courseId))

    const userLessons = lessons.map((lesson) => ({
      userId: userId,
      lessonId: lesson.id,
      isCompleted: false,
    }))

    await db.insert(UserLessonsTable).values(userLessons)
  } catch (error) {
    console.error('Error tracking course lessons:', error)
  }
}
