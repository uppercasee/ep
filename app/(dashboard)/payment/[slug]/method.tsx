'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { updatePaymentTransaction } from '@/features/payment/actions/update_payment'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface PaymentProps {
  id: string
  tid: string | null
}

const PaymentMethod = (props: PaymentProps) => {
  const [transactionId, setTransactionId] = useState(props.tid || '')
  console.log(transactionId)

  async function handlePayment() {
    if (!transactionId) {
      toast('Please enter a transaction ID.')
      return
    }

    const paymentData = {
      paymentId: props.id,
      transactionId,
    }

    const success = await updatePaymentTransaction(paymentData)
    console.log(success)

    if (success) {
      redirect('/dashboard')
    }
  }

  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="transactionId"
          className="block text-sm font-semibold mb-2"
        >
          Transaction ID
        </label>
        <Input
          id="transactionId"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          placeholder="Enter your transaction ID"
        />
      </div>
      <Button className="mt-4 w-full" onClick={handlePayment}>
        Submit Payment
      </Button>
    </>
  )
}

export default PaymentMethod
