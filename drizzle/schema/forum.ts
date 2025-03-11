import { integer, pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core'
import { createdAt, id, updatedAt } from '../schemaHelpers'

// Post Table
export const PostTable = pgTable('posts', {
  id,
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  author: varchar('author', { length: 100 }).notNull(),
  createdAt,
  updatedAt,
})

// Reply Table
export const ReplyTable = pgTable('replies', {
  id,
  content: text('content').notNull(),
  author: varchar('author', { length: 100 }).notNull(),
  postId: uuid('post_id')
    .notNull()
    .references(() => PostTable.id),
  createdAt,
  updatedAt,
})
