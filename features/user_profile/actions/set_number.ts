'use server'

import { db } from '@/drizzle/db'
import { UsersTable } from '@/drizzle/schema'
import { current_user } from '@/lib/server-utils'
import { eq } from 'drizzle-orm'

export const set_number = async (newPhoneNumber: string) => {
  const user_data = await current_user()

  if (!user_data?.id) {
    throw new Error('Not Authorized')
  }

  try {
    const result = await db
      .update(UsersTable)
      .set({ phoneNumber: newPhoneNumber })
      .where(eq(UsersTable.clerkUserId, user_data.id))
      .returning({ insertedNumber: UsersTable.phoneNumber })

    return result
  } catch (error) {
    console.error('Error updating phone number:', error)
    throw new Error('Error updating phone number')
  }
}
