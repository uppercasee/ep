'use server'

import { db } from '@/drizzle/db'
import { UsersTable } from '@/drizzle/schema'
import { current_user } from '@/lib/server-utils'
import { eq } from 'drizzle-orm'

export const getUserStreak = async () => {
  const user_data = await current_user()

  if (!user_data?.id) {
    throw new Error('Not Authorized')
  }

  const user = await db.query.UsersTable.findFirst({
    where: eq(UsersTable.clerkUserId, user_data.id),
    columns: {
      lastXpUpdate: true,
      streak: true,
    },
  })
  if (!user) return 0

  const lastXPDate = user.lastXpUpdate
    ? new Date(user.lastXpUpdate)
    : new Date(0)
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)

  const currentStreak = user.streak ?? 0

  // If lastXPUpdate is today, return the current streak
  if (lastXPDate.toDateString() === today.toDateString()) {
    return currentStreak
  }

  // If lastXPUpdate is yesterday, increment streak
  if (lastXPDate.toDateString() === yesterday.toDateString()) {
    await db
      .update(UsersTable)
      .set({ streak: currentStreak + 1, lastXpUpdate: today })
      .where(eq(UsersTable.clerkUserId, user_data.id))
    return currentStreak + 1
  }

  // Otherwise, reset streak
  await db
    .update(UsersTable)
    .set({ streak: 0, lastXpUpdate: today })
    .where(eq(UsersTable.clerkUserId, user_data.id))

  return 0
}
