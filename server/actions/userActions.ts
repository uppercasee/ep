'use server'

import { db } from '@/drizzle/db'
import { UsersTable } from '@/drizzle/schema'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'

export async function toggleUserRole() {
  const { userId } = await auth()
  if (!userId) {
    return Error('Not Authorized')
  }

  try {
    const user = await db
      .select()
      .from(UsersTable)
      .where(eq(UsersTable.clerkUserId, userId))
      .limit(1)
      .execute()

    if (user.length === 0) {
      throw new Error('User not found')
    }

    const currentRole = user[0].role || 'student'
    const newRole = currentRole === 'teacher' ? 'student' : 'teacher'

    await db
      .update(UsersTable)
      .set({ role: newRole })
      .where(eq(UsersTable.clerkUserId, userId))
      .execute()

    return 'success'
  } catch (error) {
    console.error('Failed to update user role:', error)
    throw new Error('Failed to update user role.')
  }
}

export async function getUserRole(): Promise<'teacher' | 'student'> {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Not Authorized')
  }

  try {
    const user = await db
      .select()
      .from(UsersTable)
      .where(eq(UsersTable.clerkUserId, userId))
      .limit(1)
      .execute()

    if (user.length === 0) {
      throw new Error('User not found')
    }

    return user[0].role || 'student'
  } catch (error) {
    console.error('Failed to get user role:', error)
    throw new Error('Failed to get user role.')
  }
}
