import { relations, sql } from 'drizzle-orm'
import {
  boolean,
  check,
  integer,
  pgTable,
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

export const CourseRelationships = relations(CoursesTable, ({ many }) => ({}))
