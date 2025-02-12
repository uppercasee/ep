'use server'

import { db } from '@/drizzle/db'
import { CoursesTable, PaymentTable, UsersTable } from '@/drizzle/schema'
import { current_user } from '@/lib/server-utils'
import { getUserId } from '@/server/db/users'
import { clerkClient } from '@clerk/nextjs/server'
import { and, eq } from 'drizzle-orm'

export async function getPendingPaymentDetail() {
  const user = await current_user()
  const client = await clerkClient()

  if (!user?.id) {
    throw new Error('Not Authorized')
  }

  const userId = await getUserId(user.id)

  const result = await db
    .select({
      userId: UsersTable.clerkUserId,
      courseTitle: CoursesTable.title,
      coursePrice: CoursesTable.price,
      paymentMethod: PaymentTable.paymentMethod,
      paymentTransactionId: PaymentTable.transactionId,
      paymentStatus: PaymentTable.status,
      paymentDate: PaymentTable.createdAt,
      paymentId: PaymentTable.id,
    })
    .from(PaymentTable)
    .innerJoin(CoursesTable, eq(CoursesTable.id, PaymentTable.courseId))
    .innerJoin(UsersTable, eq(UsersTable.id, PaymentTable.userId))
    .where(
      and(
        eq(PaymentTable.status, 'pending'),
        eq(CoursesTable.createdBy, userId)
      )
    )

  console.log(result)

  const resultsWithUsernames = await Promise.all(
    result.map(async (payment) => {
      const userDetails = await client.users.getUser(payment.userId)

      return {
        ...payment,
        username: userDetails.username || 'No Username',
      }
    })
  )

  console.log(resultsWithUsernames)

  return resultsWithUsernames || null
}
