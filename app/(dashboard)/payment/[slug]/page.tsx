import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getCoursePaymentDetail } from '@/features/payment/actions/get_payment'
import { notFound } from 'next/navigation'
import QRCode from 'react-qr-code'
import PaymentMethod from './method'
import PaymentTabs from './tab'

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug

  const course = await getCoursePaymentDetail(slug)
  if (!course) return notFound()
  console.log(course)

  // eSewa QR data
  const eSewaQRData = JSON.stringify({
    eSewa_id: course.userNumber ?? '',
    name: course.userName ?? '',
  })

  // Khalti QR data
  const khaltiQRData = JSON.stringify({
    Khalti_ID: course.userNumber ?? '',
    name: course.userName ?? '',
  })

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Payment Page</h1>
      <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section: Course Info & Payment Method */}
        <div>
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

        {/* Right Section: Payment Options & QR Code */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Payment Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Choose a payment method and scan the QR code to proceed:</p>
                <PaymentTabs
                  id={slug}
                  course={{
                    userNumber: course.userNumber,
                    userName: course.userName,
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
