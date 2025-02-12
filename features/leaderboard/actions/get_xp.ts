'use server'

import { db } from '@/drizzle/db'
import { UsersTable } from '@/drizzle/schema'
import { clerkClient } from '@clerk/nextjs/server'

export const getAllUserXp = async () => {
  const client = await clerkClient()
  try {
    const users = await db
      .select({
        id: UsersTable.id,
        xp: UsersTable.xp,
        clerkUserId: UsersTable.clerkUserId,
      })
      .from(UsersTable)
      .execute()

    const resultsWithUsernames = await Promise.all(
      users.map(async (user) => {
        const clerkUserDetails = await client.users.getUser(user.clerkUserId)

        return {
          xp: user.xp,
          username:
            clerkUserDetails.username ||
            `${clerkUserDetails.firstName} ${clerkUserDetails.lastName}`,
          imageUrl: clerkUserDetails.imageUrl || '', // Ensure image URL is included
          id: user.clerkUserId,
        }
      })
    )

    const sortedResults = resultsWithUsernames.sort((a, b) => {
      const xpA = a.xp ?? 0
      const xpB = b.xp ?? 0
      return xpB - xpA
    })

    return sortedResults
  } catch (error) {
    console.error('Error fetching user XP and details:', error)
    throw new Error('Failed to fetch user XP and details')
  }
}
