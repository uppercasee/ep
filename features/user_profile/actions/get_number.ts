'use server'

import { db } from '@/drizzle/db'
import { UsersTable } from '@/drizzle/schema'
import { current_user } from '@/lib/server-utils'
import { eq } from 'drizzle-orm'

export const get_number = async () => {
  const user_data = await current_user()

  if (!user_data?.id) {
    throw new Error('Not Authorized')
  }

  try {
    const user = await db
      .select({ phoneNumber: UsersTable.phoneNumber })
      .from(UsersTable)
      .where(eq(UsersTable.clerkUserId, user_data.id))
      .limit(1)

    console.log(user)
    // Return phone number if found, otherwise return null
    return user[0]?.phoneNumber ?? null
  } catch (error) {
    console.error('Error fetching phone number:', error)
    throw new Error('Error fetching phone number')
  }
}
