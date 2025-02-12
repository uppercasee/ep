import { relations } from 'drizzle-orm'
import { integer, pgEnum, pgTable, uuid, varchar } from 'drizzle-orm/pg-core'
import { createdAt, id, updatedAt } from '../schemaHelpers'
import { CoursesTable } from './course'
import { UsersTable } from './user'

export const paymentMethodEnum = pgEnum('payment_method', [
  'esewa',
  'khalti',
  'ime_pay',
  'bank_transfer',
  'stripe',
])
export const paymentStatusEnum = pgEnum('payment_status', [
  'success',
  'pending',
  'failed',
])

export const PaymentTable = pgTable('payment', {
  id,
  amount: integer('amount').notNull(),
  currency: varchar('currency', { length: 3 }).notNull(),
  status: paymentStatusEnum('paymentStatusEnum').default('pending'),
  userId: uuid('user_id')
    .notNull()
    .references(() => UsersTable.id, { onDelete: 'cascade' }),
  courseId: uuid('course_id')
    .notNull()
    .references(() => CoursesTable.id, {
      onDelete: 'cascade',
    }),
  paymentMethod: paymentMethodEnum('payment_method').default('esewa'),
  transactionId: varchar('transaction_id', { length: 100 }),
  createdAt,
  updatedAt,
})

export const PaymentRelationships = relations(PaymentTable, ({ one }) => ({
  user: one(UsersTable, {
    fields: [PaymentTable.userId],
    references: [UsersTable.id],
  }),
  course: one(CoursesTable, {
    fields: [PaymentTable.userId],
    references: [CoursesTable.id],
  }),
}))
