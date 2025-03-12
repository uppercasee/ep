'use server'

import { db } from '@/drizzle/db'
import { UsersTable } from '@/drizzle/schema'
import { clerkClient } from '@clerk/nextjs/server'

export async function getUsersAdmin() {
  const client = await clerkClient()
  try {
    const users = await db
      .select({
        id: UsersTable.id,
        role: UsersTable.role,
        status: UsersTable.status,
        clerkUserId: UsersTable.clerkUserId,
      })
      .from(UsersTable)
      .execute()

    const resultsWithUsernames = await Promise.all(
      users.map(async (user) => {
        const clerkUserDetails = await client.users.getUser(user.clerkUserId)

        return {
          username:
            clerkUserDetails.username ||
            `${clerkUserDetails.firstName} ${clerkUserDetails.lastName}`,
          imageUrl: clerkUserDetails.imageUrl || '', // Ensure image URL is included
          ...user,
        }
      })
    )

    return resultsWithUsernames
  } catch (error) {
    console.error('Error fetching user XP and details:', error)
    throw new Error('Failed to fetch user XP and details')
  }
}
