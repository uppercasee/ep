'use server'

import { db } from '@/drizzle/db'
import {
  ContentTable,
  CoursesTable,
  LessonsTable,
  UserLessonsTable,
} from '@/drizzle/schema'
import { and, eq } from 'drizzle-orm'

type Lesson = {
  id: string | null
  title: string | null
  tier: 'free' | 'paid' | null
  position: number | null
  type: 'quiz' | 'video' | null
  url: string
}

type Course = {
  id: string | null
  title: string | null
  description: string | null
  category: string | null
  price: number | null
  lessons: Lesson[]
}

export async function getEntireCourse(courseId: string) {
  try {
    const courseWithLessonsAndContent = await db
      .select({
        courseId: CoursesTable.id,
        courseTitle: CoursesTable.title,
        courseDescription: CoursesTable.description,
        courseCategory: CoursesTable.category,
        coursePrice: CoursesTable.price,
        lessonId: LessonsTable.id,
        lessonTitle: LessonsTable.title,
        lessonTier: LessonsTable.tier,
        lessonPosition: LessonsTable.position,
        contentId: ContentTable.id,
        contentTitle: ContentTable.title,
        contentUrl: ContentTable.url,
        contentType: ContentTable.type,
        contentCreatedAt: ContentTable.createdAt,
      })
      .from(CoursesTable)
      .leftJoin(LessonsTable, eq(LessonsTable.courseId, CoursesTable.id))
      .leftJoin(ContentTable, and(eq(ContentTable.lessonId, LessonsTable.id)))
      .where(eq(CoursesTable.id, courseId))
      .orderBy(LessonsTable.position)

    console.log(courseWithLessonsAndContent)

    const courseData: Course = {
      id: courseWithLessonsAndContent[0]?.courseId,
      title: courseWithLessonsAndContent[0]?.courseTitle,
      description: courseWithLessonsAndContent[0]?.courseDescription,
      category: courseWithLessonsAndContent[0]?.courseCategory,
      price: courseWithLessonsAndContent[0]?.coursePrice,
      lessons: [],
    }

    for (const row of courseWithLessonsAndContent) {
      const existingLesson = courseData.lessons.find(
        (lesson) => lesson.id === row.lessonId
      )

      if (!existingLesson) {
        courseData.lessons.push({
          id: row.lessonId,
          title: row.lessonTitle ?? null,
          tier: row.lessonTier ?? null,
          position: row.lessonPosition ?? null,
          type: row.contentType ?? null,
          url: row.contentUrl ?? '',
        })
      }
    }

    console.log(courseData)
    return courseData
  } catch (error) {
    console.error('Error fetching course:', error)
    throw new Error('Failed to retrieve course data')
  }
}
