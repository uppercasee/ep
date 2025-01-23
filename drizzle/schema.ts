import Lessons from '@/app/(dashboard)/courses/[slug]/edit/_components/lessons'
import { relations, sql } from 'drizzle-orm'
import {
  boolean,
  check,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

const createdAt = timestamp('created_at', { withTimezone: true })
  .notNull()
  .defaultNow()
const updatedAt = timestamp('updated_at', { withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date())

export const RoleEnum = pgEnum('role', ['student', 'teacher'])

export const UsersTable = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
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
  url: text('url').notNull(),
  lessonId: uuid('lesson_id')
    .notNull()
    .references(() => LessonsTable.id, { onDelete: 'cascade' }),
  quizId: uuid('quiz_id')
    .notNull()
    .references(() => QuizTable.id, { onDelete: 'cascade' }),
  createdAt,
  updatedAt,
})

export const QuizTable = pgTable('quiz', {
  id: uuid('id').primaryKey().defaultRandom(),
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
  id: uuid('id').primaryKey().defaultRandom(),
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
  id: uuid('id').primaryKey().defaultRandom(),
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

export const CoursesTable = pgTable(
  'courses',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    title: varchar('title', { length: 100 }).notNull(),
    description: varchar('description', { length: 500 }).notNull(),
    createdBy: uuid('created_by')
      .notNull()
      .references(() => UsersTable.id, { onDelete: 'cascade' }),
    category: varchar('category', { length: 255 }).notNull(),
    isPublished: boolean('is_published').default(false),
    price: integer('price'),
    tags: text('tags').array(),
    thumbnailUrl: text('thumbnail_url'),
    createdAt,
    updatedAt,
  },
  (table) => [
    {
      checkConstraint: check('price_check1', sql`${table.price} > 0`),
    },
  ]
)

// export const UserRelation = relations(UsersTable, ({ one, many }) => ({
//   CreatedCourse: many(CoursesTable),
// }))

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
