'use server'

import { db } from '@/drizzle/db'
import { UsersTable } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function createNewUser(data: typeof UsersTable.$inferInsert) {
  return db.insert(UsersTable).values(data)
}

export async function deleteUser(clerkUserId: string) {
  return db.delete(UsersTable).where(eq(UsersTable.clerkUserId, clerkUserId))
  //TODO: batch delete every related tables i.e. UsersTable and courseTable
}

export async function getUserId(clerkUserId: string) {
  const user = await db
    .select()
    .from(UsersTable)
    .where(eq(UsersTable.clerkUserId, clerkUserId))
    .limit(1)
    .execute()
  return user[0].id
}

export async function getUserFromClerkId(clerkUserId: string) {
  const user = await db
    .select()
    .from(UsersTable)
    .where(eq(UsersTable.clerkUserId, clerkUserId))
    .limit(1)
    .execute()

  return user[0]
}
