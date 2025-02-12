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

  // Get the current time in UTC (set hours/minutes/seconds to zero)
  const now = new Date()
  const nowUtc = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  )

  // Convert the stored lastXpUpdate into a UTC date (or use epoch if missing)
  let lastXpUtc: Date
  if (user.lastXpUpdate) {
    const lastUpdate = new Date(user.lastXpUpdate)
    lastXpUtc = new Date(
      Date.UTC(
        lastUpdate.getUTCFullYear(),
        lastUpdate.getUTCMonth(),
        lastUpdate.getUTCDate()
      )
    )
  } else {
    lastXpUtc = new Date(0)
  }

  // Calculate the difference in days between now and the last XP update (using UTC dates)
  const diffDays =
    (nowUtc.getTime() - lastXpUtc.getTime()) / (1000 * 60 * 60 * 24)
  const currentStreak = user.streak ?? 0
  let newStreak: number

  // If the XP was already received today:
  if (diffDays === 0) {
    newStreak = currentStreak === 0 ? 1 : currentStreak
    if (currentStreak === 0) {
      await db
        .update(UsersTable)
        .set({ streak: newStreak, lastXpUpdate: nowUtc })
        .where(eq(UsersTable.clerkUserId, user_data.id))
    }
    return newStreak
  }

  // If the last XP update was exactly yesterday:
  if (diffDays === 1) {
    newStreak = currentStreak + 1
    await db
      .update(UsersTable)
      .set({ streak: newStreak, lastXpUpdate: nowUtc })
      .where(eq(UsersTable.clerkUserId, user_data.id))
    return newStreak
  }

  // If the gap is more than 1 day, reset the streak (start a new streak at 1)
  newStreak = 1
  await db
    .update(UsersTable)
    .set({ streak: newStreak, lastXpUpdate: nowUtc })
    .where(eq(UsersTable.clerkUserId, user_data.id))
  return newStreak
}
