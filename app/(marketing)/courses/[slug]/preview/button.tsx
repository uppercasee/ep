'use client'

import { Button } from '@/components/ui/button'
import { createPaymentRecord } from '@/features/payment/actions/create_payment'
import { redirect } from 'next/navigation'
import React from 'react'

interface EnrollProps {
  id: string
  price: number | null
}

const EnrollNowButton = (detail: EnrollProps) => {
  const handleEnroll = async () => {
    if (detail.price == null) {
      console.error('Course price is missing')
      return
    }

    const paymentId = await createPaymentRecord(detail.id, detail.price)

    redirect(`/payment/${paymentId}`)
  }

  return (
    <Button className="w-full" size="lg" onClick={handleEnroll}>
      Enroll Now
    </Button>
  )
}

export default EnrollNowButton
