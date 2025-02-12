import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCoursePaymentDetail } from '@/features/payment/actions/get_payment'
import { notFound } from 'next/navigation'
import QRCode from 'react-qr-code'
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

  const qrData = JSON.stringify({
    eSewa_id: course.userNumber ?? '',
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
                <p className="">
                  Choose a payment method and scan the QR code to proceed:
                </p>
                <ul className="space-y-2">
                  <li>✅ eSewa</li>
                </ul>
                <div className="flex flex-col items-center">
                  <QRCode value={qrData} size={160} />
                  <p className="text-sm mt-2">Send to: {course.userNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
