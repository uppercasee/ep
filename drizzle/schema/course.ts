import { relations, sql } from 'drizzle-orm'
import {
  boolean,
  check,
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { UsersTable } from '../schema'
import { createdAt, id, updatedAt } from '../schemaHelpers'

export const CoursesTable = pgTable(
  'courses',
  {
    id,
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

export const UserCoursesTable = pgTable(
  'user_courses',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => UsersTable.id, { onDelete: 'cascade' }),
    courseId: uuid('course_id')
      .notNull()
      .references(() => CoursesTable.id, { onDelete: 'cascade' }),
    isCompleted: boolean('is_completed').default(false),
    createdAt,
    updatedAt,
  },
  (table) => [
    primaryKey(table.userId, table.courseId),
    {
      clerkUserIdIndex: index('user_courses.user_id_index').on(table.userId),
      courseIdIndex: index('user_courses.course_id_index').on(table.courseId),
    },
  ]
)

export const CourseRelationships = relations(CoursesTable, ({ many }) => ({
  users: many(UserCoursesTable),
}))

export const UserCoursesRelationships = relations(
  UserCoursesTable,
  ({ one }) => ({
    user: one(UsersTable, {
      fields: [UserCoursesTable.userId],
      references: [UsersTable.id],
    }),
    course: one(CoursesTable, {
      fields: [UserCoursesTable.courseId],
      references: [CoursesTable.id],
    }),
  })
)
