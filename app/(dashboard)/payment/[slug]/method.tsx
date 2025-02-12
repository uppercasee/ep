'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { updatePaymentTransaction } from '@/features/payment/actions/update_payment'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface PaymentProps {
  id: string
  tid: string | null
}

const PaymentMethod = (props: PaymentProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const methodFromUrl = searchParams.get('method') as 'esewa' | 'khalti' | null

  const [transactionId, setTransactionId] = useState(props.tid || '')
  const [paymentMethod, setPaymentMethod] = useState<'esewa' | 'khalti'>(
    methodFromUrl || 'esewa' // Default to 'esewa' if no parameter
  )

  useEffect(() => {
    if (methodFromUrl) {
      setPaymentMethod(methodFromUrl)
    }
  }, [methodFromUrl])

  async function handlePayment() {
    if (!transactionId) {
      toast('Please enter a transaction ID.')
      return
    }

    if (!paymentMethod) {
      toast('Please select a payment method.')
      return
    }

    const paymentData = {
      paymentId: props.id,
      transactionId,
      paymentMethod,
    }

    const success = await updatePaymentTransaction(paymentData)

    if (success) {
      redirect('/dashboard')
    }
  }

  function handlePaymentMethodChange(value: 'esewa' | 'khalti') {
    setPaymentMethod(value)
    router.push(`/payment/${props.id}?method=${value}`)
  }

  return (
    <>
      <div className="mb-4">
        <Label
          htmlFor="paymentMethod"
          className="block text-sm font-semibold mb-2"
        >
          Payment Method
        </Label>
        <RadioGroup
          value={paymentMethod}
          onValueChange={handlePaymentMethodChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="esewa" id="esewa" />
            <Label htmlFor="esewa">eSewa</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="khalti" id="khalti" />
            <Label htmlFor="khalti">Khalti</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="mb-4">
        <Label
          htmlFor="transactionId"
          className="block text-sm font-semibold mb-2"
        >
          Transaction ID
        </Label>
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
