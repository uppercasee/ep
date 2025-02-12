import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCoursePaymentDetail } from '@/features/payment/actions/get_payment'
import { notFound } from 'next/navigation'
import PaymentMethod from './method'

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug

  const course = await getCoursePaymentDetail(slug)
  if (!course) return notFound()
  console.log(course)

  return (
    <>
      <div className="max-w-lg mx-auto p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold mb-4">Payment Page</h1>
        {/* Course Information Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">Course Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-lg font-semibold">{course.courseTitle}</p>
              <p className="text-gray-600">{course.courseDesc}</p>
              <p className="text-lg font-bold text-green-600 mt-2">
                Price: NPR {course.coursePrice}
              </p>
            </div>
          </CardContent>
        </Card>
        <PaymentMethod id={slug} tid={course.transactionId} />
      </div>
      <div className="text-center mt-4 text-sm text-muted-foreground">
        <p>30-Day Money-Back Guarantee</p>
      </div>
    </>
  )
}
