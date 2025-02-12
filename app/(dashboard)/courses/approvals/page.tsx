'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { approveCourse } from '@/features/courses/actions/approve_course'
import { getPendingPaymentDetail } from '@/features/payment/actions/get_pending_payment'
import { useMutation, useQuery } from '@tanstack/react-query'
import { CheckCircle, Eye, XCircle } from 'lucide-react'
import { CldImage } from 'next-cloudinary'
import { useState } from 'react'
import { toast } from 'sonner'

export default function CoursesApproval() {
  const [selectedPayment, setSelectedPayment] = useState<{
    id: string
    student: string
    course: string
    amount: string
    paymentId: string | null
    proof: string
    date: string
  } | null>(null)

  const { data, error, isLoading, refetch } = useQuery(
    ['pendingPayments'],
    getPendingPaymentDetail
  )

  const mappedData = data?.map((request) => ({
    id: request.paymentId,
    student: request.username,
    course: request.courseTitle,
    amount: request.coursePrice?.toString() || '0',
    paymentId: request.paymentTransactionId,
    proof: 'samples/animals/cat',
    date: request.paymentDate.toLocaleString(),
  }))

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading data</div>

  const { mutateAsync: approvePayment, isLoading: isApproving } = useMutation(
    approveCourse,
    {
      onSuccess: async () => {
        toast.success('Course Approved!')
        await refetch()
      },
      onError: () => {
        toast.error('An error occurred while approving the course')
      },
    }
  )

  const handleApproval = async (paymentId: string | null | undefined) => {
    if (!paymentId) {
      toast.error('Approval payment id failed!')
      return false
    }
    await approvePayment(paymentId)
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Pending Course Approvals</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SN</TableHead>
            <TableHead>Student Name</TableHead>
            <TableHead>Course Title</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Payment ID</TableHead>
            <TableHead>Payment Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mappedData?.map((request, index) => (
            <TableRow key={request.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{request.student}</TableCell>
              <TableCell>{request.course}</TableCell>
              <TableCell>{request.amount}</TableCell>
              <TableCell>{request.paymentId}</TableCell>
              <TableCell>{request.date}</TableCell>
              <TableCell className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedPayment(request)}
                    >
                      <Eye className="w-4 h-4" /> View
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Payment Details</DialogTitle>
                    </DialogHeader>
                    {selectedPayment && (
                      <div className="space-y-4">
                        <p>
                          <strong>Student:</strong> {selectedPayment.student}
                        </p>
                        <p>
                          <strong>Course:</strong> {selectedPayment.course}
                        </p>
                        <p>
                          <strong>Amount:</strong> {selectedPayment.amount}
                        </p>
                        <p>
                          <strong>Payment ID:</strong>{' '}
                          {selectedPayment.paymentId}
                        </p>
                        <div className="w-full bg-gray-200 flex justify-center items-center overflow-hidden rounded-lg">
                          <CldImage
                            src={selectedPayment.proof}
                            alt="Payment Proof"
                            width={400}
                            height={750}
                            gravity="auto"
                            quality="auto"
                          />
                        </div>
                      </div>
                    )}
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button>Close</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button
                  className="bg-green-500 text-white"
                  onClick={() => handleApproval(request.id)}
                  disabled={isApproving}
                >
                  <CheckCircle className="w-4 h-4" />
                  {isApproving ? 'Approving...' : 'Approve'}
                </Button>
                <Button className="bg-red-500 text-white">
                  <XCircle className="w-4 h-4" /> Disapprove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
