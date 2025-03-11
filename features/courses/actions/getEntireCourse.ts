'use server'

import { db } from '@/drizzle/db'
import {
  AnswerTable,
  ContentTable,
  CoursesTable,
  LessonsTable,
  QuestionTable,
  QuizTable,
} from '@/drizzle/schema'
import { and, eq } from 'drizzle-orm'

type Lesson = {
  id: string | null
  title: string | null
  tier: 'free' | 'paid' | null
  position: number | null
  type: 'quiz' | 'video' | null
  url: string
  timeLimit?: number | null
  passingScore?: number | null
  maxAttempts?: number | null
  questions?: Question[] // Add questions for each quiz
}

type Question = {
  id: string | null
  text: string | null
  type: 'mcq' | 'truefalse' | null
  points: number | null
  answers: Answer[] // Added answers field
}

type Answer = {
  id: string | null
  text: string | null
  isCorrect: boolean | null
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
        quizId: QuizTable.id, // Fetch quizId
        quizTitle: QuizTable.title, // Fetch quiz title
        quizTimeLimit: QuizTable.timeLimit, // Fetch quiz timeLimit
        quizPassingScore: QuizTable.passingScore, // Fetch passingScore
        quizMaxAttempts: QuizTable.maxAttempts, // Fetch maxAttempts
        questionId: QuestionTable.id, // Fetch questionId
        questionText: QuestionTable.text, // Fetch question text
        questionType: QuestionTable.type, // Fetch question type
        questionPoints: QuestionTable.points, // Fetch question points
        answerId: AnswerTable.id, // Fetch answerId
        answerText: AnswerTable.text, // Fetch answer text
        answerIsCorrect: AnswerTable.isCorrect, // Fetch answer correctness
      })
      .from(CoursesTable)
      .leftJoin(LessonsTable, eq(LessonsTable.courseId, CoursesTable.id))
      .leftJoin(ContentTable, and(eq(ContentTable.lessonId, LessonsTable.id)))
      .leftJoin(QuizTable, eq(ContentTable.quizId, QuizTable.id))
      .leftJoin(QuestionTable, eq(QuestionTable.quizId, QuizTable.id)) // Join Questions based on quizId
      .leftJoin(AnswerTable, eq(AnswerTable.questionId, QuestionTable.id)) // Join Answers based on questionId
      .where(eq(CoursesTable.id, courseId))
      .orderBy(LessonsTable.position)

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
          timeLimit: row.quizTimeLimit ?? null,
          passingScore: row.quizPassingScore ?? null,
          maxAttempts: row.quizMaxAttempts ?? null,
          questions: [],
        })
      }

      if (row.questionId) {
        const existingQuiz = courseData.lessons.find(
          (lesson) => lesson.id === row.lessonId
        )

        if (existingQuiz) {
          // Add question to the corresponding quiz
          existingQuiz.questions?.push({
            id: row.questionId,
            text: row.questionText ?? null,
            type: row.questionType ?? null,
            points: row.questionPoints ?? null,
            answers: [
              {
                id: row.answerId,
                text: row.answerText ?? null,
                isCorrect: row.answerIsCorrect ?? false,
              },
            ],
          })
        }
      }
    }

    return courseData
  } catch (error) {
    console.error('Error fetching course:', error)
    throw new Error('Failed to retrieve course data')
  }
}
