import { db } from '@/drizzle/db'
import { CoursesTable, PaymentTable } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function getCoursePaymentDetail(id: string) {
  const result = await db
    .select({
      courseTitle: CoursesTable.title,
      courseDesc: CoursesTable.description,
      coursePrice: CoursesTable.price,
      courseThumbnail: CoursesTable.thumbnailUrl,
      paymentMethod: PaymentTable.paymentMethod,
      transactionId: PaymentTable.transactionId,
      paymentStatus: PaymentTable.status,
    })
    .from(PaymentTable)
    .innerJoin(CoursesTable, eq(CoursesTable.id, PaymentTable.courseId))
    .limit(1)

  return result[0] || null
}
