import { relations } from 'drizzle-orm'
import { index, integer, pgEnum, pgTable, text } from 'drizzle-orm/pg-core'
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
    role: RoleEnum('role').default('student'),
    status: StatusEnum('status').default('active'),
    xp: integer('xp').default(0),
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
