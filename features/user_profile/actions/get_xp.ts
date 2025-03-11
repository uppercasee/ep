import { db } from '@/drizzle/db'
import { UsersTable } from '@/drizzle/schema'
import { current_user } from '@/lib/server-utils'
import { eq } from 'drizzle-orm'

export const getXp = async () => {
  const user = await current_user()

  if (!user?.id) {
    throw new Error('Not Authorized')
  }

  const user_data = await db
    .select()
    .from(UsersTable)
    .where(eq(UsersTable.clerkUserId, user.id))
    .limit(1)

  const xp = user_data[0]?.xp ?? 0
  console.log(xp)

  return xp
}
