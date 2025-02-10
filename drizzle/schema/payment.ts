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
import { createdAt, id, updatedAt } from '../schemaHelpers'
import { UsersTable } from './user'

export const PaymentTable = pgTable(
  'payment',
  {
    id,
    amount: integer('amount').notNull(),
    currency: varchar('currency', { length: 3 }).notNull(),
    status: varchar('status', { length: 50 }).notNull(),
    userId: uuid('user_id')
      .notNull()
      .references(() => UsersTable.id, { onDelete: 'cascade' }),
    createdAt,
    updatedAt,
  },
  (table) => [
    {
      checkConstraint: check(
        'status_check',
        sql`${table.status} in ('succeeded', 'failed')`
      ),
    },
  ]
)

export const PaymentRelationships = relations(PaymentTable, ({ one }) => ({
  user: one(UsersTable, {
    fields: [PaymentTable.userId],
    references: [UsersTable.id],
  }),
}))
