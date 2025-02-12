import { db } from '@/drizzle/db'
import { ContentTable, CoursesTable, LessonsTable } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function getCourseDetails(courseId: string) {
  const course = await db
    .select({
      id: CoursesTable.id,
      title: CoursesTable.title,
      description: CoursesTable.description,
      category: CoursesTable.category,
      isPublished: CoursesTable.isPublished,
      price: CoursesTable.price,
      tags: CoursesTable.tags,
      thumbnailUrl: CoursesTable.thumbnailUrl,
      createdAt: CoursesTable.createdAt,
    })
    .from(CoursesTable)
    .where(eq(CoursesTable.id, courseId))
    .limit(1)

  if (!course.length) return null

  const lessons = await db
    .select({
      id: LessonsTable.id,
      title: LessonsTable.title,
      tier: LessonsTable.tier,
      position: LessonsTable.position,
    })
    .from(LessonsTable)
    .where(eq(LessonsTable.courseId, courseId))
    .orderBy(LessonsTable.position)

  const content = await db
    .select({
      type: ContentTable.type,
      lessonId: ContentTable.lessonId,
    })
    .from(ContentTable)
    .where(eq(ContentTable.courseId, courseId))

  return {
    ...course[0],
    lessons: lessons.map((lesson) => ({
      ...lesson,
      content: content.filter((c) => c.lessonId === lesson.id),
    })),
  }
}
