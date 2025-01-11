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
