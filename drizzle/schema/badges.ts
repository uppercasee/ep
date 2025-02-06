import { relations, sql } from 'drizzle-orm'
import {
  check,
  index,
  pgTable,
  primaryKey,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { createdAt, id, updatedAt } from '../schemaHelpers'
import { UsersTable } from './user'

export const BadgesTable = pgTable(
  'badges',
  {
    id,
    name: varchar('name', { length: 100 }).notNull(),
    description: varchar('description', { length: 500 }).notNull(),
    icon: varchar('icon', { length: 100 }).notNull(),
    createdAt,
    updatedAt,
  },
  (table) => [
    {
      checkConstraint: check('name_check', sql`${table.name} <> ''`),
    },
  ]
)

export const UserBadgesTable = pgTable(
  'user_badges',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => UsersTable.id, { onDelete: 'cascade' }),
    badgeId: uuid('badge_id')
      .notNull()
      .references(() => BadgesTable.id, { onDelete: 'cascade' }),
    createdAt,
    updatedAt,
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.badgeId] }),
    {
      userIdIndex: index('user_badges.user_id_index').on(table.userId),
      badgeIdIndex: index('user_badges.badge_id_index').on(table.badgeId),
    },
  ]
)

export const UserBadgesRelations = relations(UserBadgesTable, ({ one }) => ({
  user: one(UsersTable, {
    fields: [UserBadgesTable.userId],
    references: [UsersTable.id],
  }),
  badge: one(BadgesTable, {
    fields: [UserBadgesTable.badgeId],
    references: [BadgesTable.id],
  }),
}))
