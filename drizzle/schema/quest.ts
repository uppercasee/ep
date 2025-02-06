import { relations, sql } from 'drizzle-orm'
import {
  check,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { createdAt, id, updatedAt } from '../schemaHelpers'
import { UsersTable } from './user'

export const QuestStatusEnum = pgEnum('quest_status', ['completed', 'pending'])

export const QuestTable = pgTable(
  'quest',
  {
    id,
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description').notNull(),
    points: integer('points').notNull(),
    createdAt,
    updatedAt,
  },
  (table) => [
    {
      checkConstraint: check('points_check', sql`${table.points} > 0`),
    },
  ]
)

export const UserQuestsTable = pgTable(
  'user_quests',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => UsersTable.id, { onDelete: 'cascade' }),
    questId: uuid('quest_id')
      .notNull()
      .references(() => QuestTable.id, { onDelete: 'cascade' }),
    status: QuestStatusEnum('status').default('pending'),
    createdAt,
    updatedAt,
  },
  (table) => [
    {
      userIdIndex: index('user_quests.user_id_index').on(table.userId),
      questIdIndex: index('user_quests.quest_id_index').on(table.questId),
    },
  ]
)

export const QuestRelationships = relations(QuestTable, ({ many }) => ({
  userQuests: many(UserQuestsTable),
}))

export const UserQuestsRelationships = relations(
  UserQuestsTable,
  ({ one }) => ({
    user: one(UsersTable, {
      fields: [UserQuestsTable.userId],
      references: [UsersTable.id],
    }),
    quest: one(QuestTable, {
      fields: [UserQuestsTable.questId],
      references: [QuestTable.id],
    }),
  })
)
