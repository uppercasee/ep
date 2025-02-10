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
import { CheckCircle, Eye, XCircle } from 'lucide-react'
import { CldImage } from 'next-cloudinary'
import { useState } from 'react'

export default function CoursesApproval() {
  const [selectedPayment, setSelectedPayment] = useState<{
    id: number
    student: string
    course: string
    amount: string
    paymentId: string
    proof: string
    date: string
  } | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const pendingApprovals = [
    {
      id: 1,
      student: 'Alice Johnson',
      course: 'JavaScript Basics',
      amount: '$49.99',
      paymentId: '1234567890',
      proof: 'samples/ecommerce/shoes',
      date: '2025-02-09 14:30',
    },
    {
      id: 2,
      student: 'Bob Smith',
      course: 'React Advanced',
      amount: '$69.99',
      paymentId: '0987654321',
      proof: 'samples/animals/cat',
      date: '2025-02-08 10:15',
    },
    {
      id: 3,
      student: 'Charlie Brown',
      course: 'Node.js Fundamentals',
      amount: '$59.99',
      paymentId: '5678901234',
      proof: 'samples/animals/cat',
      date: '2025-02-07 16:45',
    },
    {
      id: 4,
      student: 'David White',
      course: 'Python for Beginners',
      amount: '$39.99',
      paymentId: '6789012345',
      proof: 'samples/animals/cat',
      date: '2025-02-06 12:30',
    },
    {
      id: 5,
      student: 'Emma Green',
      course: 'CSS Mastery',
      amount: '$29.99',
      paymentId: '7890123456',
      proof: 'samples/animals/cat',
      date: '2025-02-05 09:20',
    },
    {
      id: 6,
      student: 'Fiona Black',
      course: 'Vue.js Essentials',
      amount: '$64.99',
      paymentId: '8901234567',
      proof: 'samples/animals/cat',
      date: '2025-02-04 18:10',
    },
    {
      id: 7,
      student: 'George Blue',
      course: 'Django Basics',
      amount: '$54.99',
      paymentId: '9012345678',
      proof: 'samples/animals/cat',
      date: '2025-02-03 14:05',
    },
    {
      id: 8,
      student: 'Hannah Grey',
      course: 'SQL for Developers',
      amount: '$44.99',
      paymentId: '0123456789',
      proof: 'samples/animals/cat',
      date: '2025-02-02 11:55',
    },
    {
      id: 9,
      student: 'Ian Orange',
      course: 'Ruby on Rails',
      amount: '$74.99',
      paymentId: '1234509876',
      proof: 'samples/animals/cat',
      date: '2025-02-01 08:40',
    },
    {
      id: 10,
      student: 'Julia Red',
      course: 'Machine Learning Basics',
      amount: '$99.99',
      paymentId: '2345610987',
      proof: 'samples/animals/cat',
      date: '2025-01-31 07:25',
    },
    {
      id: 11,
      student: 'Julia Red',
      course: 'Machine Learning Basics',
      amount: '$99.99',
      paymentId: '2345610987',
      proof: 'samples/animals/cat',
      date: '2025-01-31 07:25',
    },
  ]

  const totalPages = Math.ceil(pendingApprovals.length / itemsPerPage)
  const currentItems = pendingApprovals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

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
          {currentItems.map((request, index) => (
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
                <Button className="bg-green-500 text-white">
                  <CheckCircle className="w-4 h-4" /> Approve
                </Button>
                <Button className="bg-red-500 text-white">
                  <XCircle className="w-4 h-4" /> Disapprove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center items-center gap-6 mt-4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
