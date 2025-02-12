import { db } from '@/drizzle/db'
import { CoursesTable, PaymentTable, UsersTable } from '@/drizzle/schema'
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
      userNumber: UsersTable.phoneNumber,
      userName: UsersTable.fullname,
    })
    .from(PaymentTable)
    .innerJoin(CoursesTable, eq(CoursesTable.id, PaymentTable.courseId))
    .innerJoin(UsersTable, eq(UsersTable.id, CoursesTable.createdBy))
    .limit(1)

  console.log(result)
  return result[0] || null
}
