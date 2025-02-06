import {
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { CoursesTable } from './schema/course'
import { QuizTable } from './schema/quiz'
import { createdAt, id, updatedAt } from './schemaHelpers'

export const RoleEnum = pgEnum('role', ['student', 'teacher'])

export const UsersTable = pgTable(
  'users',
  {
    id,
    clerkUserId: text('clerk_user_id').notNull().unique(),
    role: RoleEnum('role').default('student'),
    createdAt,
    updatedAt,
  },
  (table) => [
    {
      clerkUserIdIndex: index('users.clerk_user_id_index').on(
        table.clerkUserId
      ),
    },
  ]
)

export const ContentTypeEnum = pgEnum('content_type', ['quiz', 'video'])

export const ContentTable = pgTable('content', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: ContentTypeEnum('content_type').default('video'),
  title: varchar('title', { length: 255 }).notNull(),
  url: text('url'),
  courseId: uuid('course_id')
    .notNull()
    .references(() => CoursesTable.id, { onDelete: 'cascade' }),
  lessonId: uuid('lesson_id').references(() => LessonsTable.id),
  quizId: uuid('quiz_id').references(() => QuizTable.id),
  createdAt,
  updatedAt,
})

export const UserCoursesTable = pgTable(
  'user_courses',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => UsersTable.id, { onDelete: 'cascade' }),
    courseId: uuid('course_id')
      .notNull()
      .references(() => CoursesTable.id, { onDelete: 'cascade' }),
  },
  (table) => [
    {
      clerkUserIdIndex: index('user_courses.user_id_index').on(table.userId),
      courseIdIndex: index('user_courses.course_id_index').on(table.courseId),
    },
  ]
)

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

export const CourseLessonsTable = pgTable('course_lessons', {
  courseId: uuid('course_id')
    .notNull()
    .references(() => CoursesTable.id),
  lessonId: uuid('lesson_id')
    .notNull()
    .references(() => LessonsTable.id),
})

export * from './schema/course'
export * from './schema/quiz'
