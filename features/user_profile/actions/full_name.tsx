'use server'

import { db } from '@/drizzle/db'
import { UsersTable } from '@/drizzle/schema'
import { current_user } from '@/lib/server-utils'
import { eq } from 'drizzle-orm'

export const set_fullname = async (newFullName: string) => {
  const user_data = await current_user()

  if (!user_data?.id) {
    throw new Error('Not Authorized')
  }

  try {
    const result = await db
      .update(UsersTable)
      .set({ fullname: newFullName })
      .where(eq(UsersTable.clerkUserId, user_data.id))
      .returning({ insertedName: UsersTable.fullname })

    return result
  } catch (error) {
    console.error('Error updating full name:', error)
    throw new Error('Error updating full name')
  }
}

export const get_fullname = async () => {
  const user_data = await current_user()

  if (!user_data?.id) {
    throw new Error('Not Authorized')
  }

  try {
    const user = await db
      .select({ fullName: UsersTable.fullname })
      .from(UsersTable)
      .where(eq(UsersTable.clerkUserId, user_data.id))
      .limit(1)

    console.log(user)
    // Return full name if found, otherwise return null
    return user[0]?.fullName ?? null
  } catch (error) {
    console.error('Error fetching full name:', error)
    throw new Error('Error fetching full name')
  }
}
