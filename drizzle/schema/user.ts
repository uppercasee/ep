import { relations } from 'drizzle-orm'
import { varchar } from 'drizzle-orm/mysql-core'
import {
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'
import { createdAt, id, updatedAt } from '../schemaHelpers'
import { UserBadgesTable } from './badges'
import { UserCoursesTable } from './course'
import { UserLessonsTable } from './lesson'

export const RoleEnum = pgEnum('role', ['student', 'teacher'])
export const StatusEnum = pgEnum('status', ['active', 'inactive', 'banned'])

export const UsersTable = pgTable(
  'users',
  {
    id,
    clerkUserId: text('clerk_user_id').notNull().unique(),
    fullname: text('full_name').default('John Doe'),
    role: RoleEnum('role').default('student'),
    status: StatusEnum('status').default('active'),
    xp: integer('xp').default(0),
    lastXpUpdate: timestamp('last_xp_update', { withTimezone: true }),
    streak: integer('streak').default(0),
    phoneNumber: text('phone_number').default('9840123456'),
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

export const UserRelationships = relations(UsersTable, ({ many }) => ({
  courses: many(UserCoursesTable),
  badges: many(UserBadgesTable),
  lessons: many(UserLessonsTable),
}))
