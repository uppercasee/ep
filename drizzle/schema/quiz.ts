import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { LessonsTable } from '../schema'
import { createdAt, id, updatedAt } from '../schemaHelpers'

export const QuizTable = pgTable('quiz', {
  id,
  title: varchar('title', { length: 100 }).notNull(),
  lesson: uuid('lesson')
    .notNull()
    .references(() => LessonsTable.id, { onDelete: 'cascade' }),
  createdAt,
  updatedAt,
  //TODO: time_limit, passing_score, max_attempts
})

export const QuestionType = pgEnum('question_type', ['mcq', 'truefalse'])

export const QuestionTable = pgTable('question', {
  id,
  quizId: uuid('quiz_id')
    .notNull()
    .references(() => QuizTable.id, { onDelete: 'cascade' }),
  type: QuestionType('question_type').default('mcq'),
  text: varchar('text', { length: 100 }).notNull(),
  points: integer('points').default(30),
  createdAt,
  updatedAt,
  //TODO: hint, explanation
})

export const AnswerTable = pgTable('answer', {
  id,
  questionId: uuid('question_id')
    .notNull()
    .references(() => QuestionTable.id, { onDelete: 'cascade' }),
  text: varchar('text', { length: 100 }).notNull(),
  isCorrect: boolean('is_correct').default(false),
  createdAt,
  updatedAt,
  //TODO: comments
})

//TODO: UserResponsesTable
//to track user answers and scores.

// export const UserRelation = relations(UsersTable, ({ one, many }) => ({
//   CreatedCourse: many(CoursesTable),
// }))
