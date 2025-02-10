'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useState } from 'react'

const initialBadges = [
  {
    id: 1,
    name: 'Top Performer',
    description: 'Awarded for outstanding performance.',
  },
  {
    id: 2,
    name: 'Consistency King',
    description: 'Given to users who complete courses consistently.',
  },
  {
    id: 3,
    name: 'Speed Runner',
    description: 'For finishing a course in record time.',
  },
  {
    id: 4,
    name: 'Engagement Master',
    description: 'Awarded for high participation in discussions.',
  },
]

export default function AdminBadges() {
  const [badges, setBadges] = useState(initialBadges)
  const [newBadge, setNewBadge] = useState({ name: '', description: '' })

  const addBadge = () => {
    if (newBadge.name && newBadge.description) {
      setBadges([...badges, { id: badges.length + 1, ...newBadge }])
      setNewBadge({ name: '', description: '' })
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Admin Badges</h2>

      {/* Badges Table */}
      <Card className="p-4">
        <h4 className="text-lg font-semibold mb-4">Existing Badges</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {badges.map((badge) => (
              <TableRow key={badge.id}>
                <TableCell>{badge.name}</TableCell>
                <TableCell>{badge.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Create New Badge */}
      <Card className="p-4 space-y-4">
        <h4 className="text-lg font-semibold">Create New Badge</h4>
        <Input
          placeholder="Badge Name"
          value={newBadge.name}
          onChange={(e) => setNewBadge({ ...newBadge, name: e.target.value })}
        />
        <Input
          placeholder="Badge Description"
          value={newBadge.description}
          onChange={(e) =>
            setNewBadge({ ...newBadge, description: e.target.value })
          }
        />
        <Button onClick={addBadge}>Add Badge</Button>
      </Card>
    </div>
  )
}
