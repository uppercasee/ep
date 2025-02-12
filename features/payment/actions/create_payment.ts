'use server'

import { db } from '@/drizzle/db'
import { PaymentTable } from '@/drizzle/schema'
import { current_user } from '@/lib/server-utils'
import { getUserId } from '@/server/db/users'
import { and, eq } from 'drizzle-orm'

export async function createPaymentRecord(courseId: string, price: number) {
  const user = await current_user()

  if (!user?.id) {
    throw new Error('Not Authorized')
  }

  const userId = await getUserId(user.id)

  const existingPayment = await db
    .select()
    .from(PaymentTable)
    .where(
      and(eq(PaymentTable.userId, userId), eq(PaymentTable.courseId, courseId))
    )
    .limit(1)
    .execute()

  if (existingPayment.length > 0) {
    return existingPayment[0].id
  }

  const newPayment = await db
    .insert(PaymentTable)
    .values({
      userId,
      courseId,
      amount: price,
      currency: 'NPR',
      status: 'pending',
      paymentMethod: 'esewa',
      transactionId: '',
    })
    .returning({ insertedId: PaymentTable.id })

  return newPayment[0].insertedId
}
