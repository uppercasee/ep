'use server'

import { db } from '@/drizzle/db'
import {
  AnswerTable,
  ContentTable,
  QuestionTable,
  QuizTable,
} from '@/drizzle/schema'

interface Answer {
  text: string
  isCorrect: boolean
}

interface Question {
  text: string
  type: 'mcq' | 'truefalse'
  points: number
  answers: Answer[]
}

interface Quiz {
  title: string
  timeLimit: number
  passingScore: number
  maxAttempts: number
  questions: Question[]
}

export async function addQuiz(quiz: Quiz, courseId: string) {
  try {
    // Insert quiz and get the generated ID
    const [insertedQuiz] = await db
      .insert(QuizTable)
      .values({
        title: quiz.title,
        timeLimit: quiz.timeLimit,
        passingScore: quiz.passingScore,
        maxAttempts: quiz.maxAttempts,
      })
      .returning({ id: QuizTable.id })

    if (!insertedQuiz) {
      throw new Error('Quiz insertion failed')
    }

    const quizId = insertedQuiz.id

    // Insert each question
    for (const question of quiz.questions) {
      const [insertedQuestion] = await db
        .insert(QuestionTable)
        .values({
          quizId,
          text: question.text,
          type: question.type,
          points: question.points,
        })
        .returning({ id: QuestionTable.id })

      if (!insertedQuestion) continue
      const questionId = insertedQuestion.id

      // Insert answers for the question
      if (question.answers.length > 0) {
        await db.insert(AnswerTable).values(
          question.answers.map((answer) => ({
            questionId,
            text: answer.text,
            isCorrect: answer.isCorrect,
          }))
        )
      }
    }

    // Now, add an entry in the ContentTable for this quiz
    await db.insert(ContentTable).values({
      type: 'quiz', // Matches your ContentTypeEnum
      title: quiz.title,
      courseId: courseId,
      quizId,
    })

    return { success: true, quizId, message: 'Quiz saved successfully!' }
  } catch (error) {
    console.error('Error saving quiz:', error)
    return { success: false, message: 'Failed to save quiz.' }
  }
}
