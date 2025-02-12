'use server'

import { db } from '@/drizzle/db'
import { PaymentTable } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function updatePaymentTransaction({
  paymentId,
  transactionId,
  paymentMethod,
}: {
  paymentId: string
  transactionId: string
  paymentMethod:
    | 'esewa'
    | 'khalti'
    | 'ime_pay'
    | 'bank_transfer'
    | 'stripe'
    | null
    | undefined
}) {
  try {
    const updatedPayment = await db
      .update(PaymentTable)
      .set({
        transactionId,
        status: 'pending',
        paymentMethod: paymentMethod,
      })
      .where(eq(PaymentTable.id, paymentId))
      .returning({ updatedId: PaymentTable.courseId })

    return {
      success: true,
      id: updatedPayment[0].updatedId,
      message: 'Transaction ID updated, waiting for approval.',
    }
  } catch (error) {
    console.error('Failed to update payment:', error)
    return { success: false, message: 'Payment update failed.' }
  }
}
