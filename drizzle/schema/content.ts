import { relations } from 'drizzle-orm'
import { pgEnum, pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core'
import { createdAt, id, updatedAt } from '../schemaHelpers'
import { CoursesTable } from './course'
import { LessonsTable } from './lesson'
import { QuizTable } from './quiz'

export const ContentTypeEnum = pgEnum('content_type', ['quiz', 'video'])

export const ContentTable = pgTable('content', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: ContentTypeEnum('content_type').default('video'),
  title: varchar('title', { length: 255 }).notNull(),
  url: text('url'),
  courseId: uuid('course_id')
    .notNull()
    .references(() => CoursesTable.id, { onDelete: 'cascade' }),
  lessonId: uuid('lesson_id').references(() => LessonsTable.id, {
    onDelete: 'cascade',
  }),
  quizId: uuid('quiz_id').references(() => QuizTable.id),
  createdAt,
  updatedAt,
})

export const ContentRelationships = relations(ContentTable, ({ one }) => ({
  course: one(CoursesTable, {
    fields: [ContentTable.courseId],
    references: [CoursesTable.id],
  }),
  lesson: one(LessonsTable, {
    fields: [ContentTable.lessonId],
    references: [LessonsTable.id],
  }),
  quiz: one(QuizTable, {
    fields: [ContentTable.quizId],
    references: [QuizTable.id],
  }),
}))
