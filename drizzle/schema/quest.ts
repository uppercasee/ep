import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { createdAt, id, updatedAt } from '../schemaHelpers'
import { UsersTable } from './user'

export const QuestStatusEnum = pgEnum('quest_status', ['completed', 'pending'])

export const questTypeEnum = pgEnum('quest_type', [
  'lessons_completed',
  'quiz_answers',
  'xp_earned',
])

export const QuestTable = pgTable('quest', {
  id,
  title: varchar('title', { length: 255 }).notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => UsersTable.id, { onDelete: 'cascade' }),
  questType: questTypeEnum('type').notNull(),
  target: integer('target').notNull(),
  progress: integer('progress').default(0),
  claimed: boolean('claimed').default(false),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt,
  updatedAt,
})
