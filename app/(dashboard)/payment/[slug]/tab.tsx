'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'

interface PaymentTabsProps {
  id: string
  course: {
    userNumber: string | null
    userName: string | null
  }
}

const PaymentTabs = ({ id, course }: PaymentTabsProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const methodFromUrl = searchParams.get('method') as 'esewa' | 'khalti' | null
  const [selectedTab, setSelectedTab] = useState<'esewa' | 'khalti'>(
    methodFromUrl || 'esewa'
  )

  useEffect(() => {
    if (methodFromUrl) {
      setSelectedTab(methodFromUrl)
    }
  }, [methodFromUrl])

  function handleTabChange(value: string) {
    if (value === 'esewa' || value === 'khalti') {
      router.push(`/payment/${id}?method=${value}`)
    }
  }

  const eSewaQRData = JSON.stringify({
    eSewa_id: course.userNumber ?? '',
    name: course.userName ?? '',
  })

  const khaltiQRData = JSON.stringify({
    Khalti_ID: course.userNumber ?? '',
    name: course.userName ?? '',
  })

  return (
    <Tabs
      defaultValue="esewa"
      value={selectedTab}
      onValueChange={handleTabChange}
    >
      <TabsList>
        <TabsTrigger value="esewa">eSewa</TabsTrigger>
        <TabsTrigger value="khalti">Khalti</TabsTrigger>
      </TabsList>

      <TabsContent value="esewa">
        <div className="space-y-2">
          <div className="flex flex-col items-center mt-4">
            <QRCode value={eSewaQRData} size={160} />
            <p className="text-sm mt-2">Send to: {course.userNumber}</p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="khalti">
        <div className="space-y-2">
          <div className="flex flex-col items-center mt-4">
            <QRCode value={khaltiQRData} size={160} />
            <p className="text-sm mt-2">Send to: {course.userNumber}</p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default PaymentTabs
