import { relations } from 'drizzle-orm'
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { createdAt, id, updatedAt } from '../schemaHelpers'
import { CoursesTable } from './course'
import { UsersTable } from './user'

export const TierEnum = pgEnum('tier', ['free', 'paid'])

export const LessonsTable = pgTable(
  'lessons',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    title: varchar('title', { length: 255 }).notNull(),
    videoUrl: text('video_url').notNull(),
    courseId: uuid('course_id')
      .notNull()
      .references(() => CoursesTable.id, { onDelete: 'cascade' }),
    tier: TierEnum('tier').default('paid'),
    position: integer('position').notNull(),
    createdAt,
    updatedAt,
  },
  (table) => [
    {
      courseIdIndex: index('lessons.course_id_index').on(table.courseId),
    },
  ]
)

export const UserLessonsTable = pgTable(
  'user_lessons',
  {
    userId: uuid('user_id').notNull(),
    lessonId: uuid('lesson_id').notNull(),
    isCompleted: boolean('is_completed').default(false),
    createdAt,
    updatedAt,
  },
  (table) => [
    {
      userIdIndex: index('user_lessons.user_id_index').on(table.userId),
      lessonIdIndex: index('user_lessons.lesson_id_index').on(table.lessonId),
    },
  ]
)

export const CourseLessonsTable = pgTable('course_lessons', {
  courseId: uuid('course_id')
    .notNull()
    .references(() => CoursesTable.id),
  lessonId: uuid('lesson_id')
    .notNull()
    .references(() => LessonsTable.id),
})

export const LessonRelationships = relations(LessonsTable, ({ one }) => ({
  course: one(CoursesTable, {
    fields: [LessonsTable.courseId],
    references: [CoursesTable.id],
  }),
}))

export const UserLessonsRelationships = relations(
  UserLessonsTable,
  ({ one }) => ({
    user: one(UsersTable, {
      fields: [UserLessonsTable.userId],
      references: [UsersTable.id],
    }),
    lesson: one(LessonsTable, {
      fields: [UserLessonsTable.lessonId],
      references: [LessonsTable.id],
    }),
  })
)
