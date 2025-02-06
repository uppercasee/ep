import { relations } from 'drizzle-orm'
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { LessonsTable, UsersTable } from '../schema'
import { createdAt, id, updatedAt } from '../schemaHelpers'

export const QuizTable = pgTable('quiz', {
  id,
  title: varchar('title', { length: 100 }).notNull(),
  lesson: uuid('lesson')
    .notNull()
    .references(() => LessonsTable.id, { onDelete: 'cascade' }),
  timeLimit: integer('time_limit').default(60),
  passingScore: integer('passing_score').default(60),
  maxAttempts: integer('max_attempts').default(1),
  createdAt,
  updatedAt,
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
  hint: varchar('hint', { length: 100 }),
  explanation: varchar('explanation', { length: 100 }),
  createdAt,
  updatedAt,
})

export const AnswerTable = pgTable('answer', {
  id,
  questionId: uuid('question_id')
    .notNull()
    .references(() => QuestionTable.id, { onDelete: 'cascade' }),
  text: varchar('text', { length: 100 }).notNull(),
  isCorrect: boolean('is_correct').default(false),
  comments: varchar('comments', { length: 100 }),
  createdAt,
  updatedAt,
})

export const UserResponsesTable = pgTable('user_responses', {
  userId: uuid('user_id').notNull(),
  questionId: uuid('question_id').notNull(),
  answerId: uuid('answer_id').notNull(),
  isCorrect: boolean('is_correct').default(false),
  createdAt,
  updatedAt,
})

export const QuizRelationships = relations(QuizTable, ({ one, many }) => ({
  lesson: one(LessonsTable, {
    fields: [QuizTable.lesson],
    references: [LessonsTable.id],
  }),
  questions: many(QuestionTable),
}))

export const QuestionRelationships = relations(
  QuestionTable,
  ({ one, many }) => ({
    quiz: one(QuizTable, {
      fields: [QuestionTable.quizId],
      references: [QuizTable.id],
    }),
    answers: many(AnswerTable),
  })
)

export const AnswerRelationships = relations(AnswerTable, ({ one }) => ({
  question: one(QuestionTable, {
    fields: [AnswerTable.questionId],
    references: [QuestionTable.id],
  }),
}))

export const UserResponsesRelationships = relations(
  UserResponsesTable,
  ({ one }) => ({
    user: one(UsersTable, {
      fields: [UserResponsesTable.userId],
      references: [UsersTable.id],
    }),
    question: one(QuestionTable, {
      fields: [UserResponsesTable.questionId],
      references: [QuestionTable.id],
    }),
    answer: one(AnswerTable, {
      fields: [UserResponsesTable.answerId],
      references: [AnswerTable.id],
    }),
  })
)
