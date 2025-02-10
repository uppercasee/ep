'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const reports = [
  {
    id: 1,
    title: 'Monthly Revenue Report',
    date: '2025-02-01',
    status: 'Completed',
  },
  {
    id: 2,
    title: 'User Engagement Analysis',
    date: '2025-01-25',
    status: 'In Progress',
  },
  {
    id: 3,
    title: 'Course Performance Overview',
    date: '2025-01-20',
    status: 'Completed',
  },
  {
    id: 4,
    title: 'Platform Growth Metrics',
    date: '2025-01-15',
    status: 'Pending',
  },
]

export default function AdminReports() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Admin Reports</h2>

      {/* Reports Table */}
      <Card className="p-4">
        <h4 className="text-lg font-semibold mb-4">Generated Reports</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.title}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>{report.status}</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button variant="outline" className="w-full">
          Generate New Report
        </Button>
        <Button className="w-full">Download All Reports</Button>
      </div>
    </div>
  )
}
