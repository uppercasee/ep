'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useProfilePhoneNumber } from '@/hooks/useProfilePhoneNumber'
import { useState } from 'react'

const ProfilePhoneNumber = () => {
  const { phoneNumber, loading, updatePhoneNumber } = useProfilePhoneNumber()

  const [isEditing, setIsEditing] = useState(false)
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber || '')

  const handleUpdatePhoneNumber = async () => {
    if (newPhoneNumber) {
      await updatePhoneNumber(newPhoneNumber)
      setIsEditing(false)
    }
  }

  return (
    <>
      <h1 className="flex w-64 items-center text-sm font-medium tracking-normal mt-4">
        Phone Number
      </h1>

      <div className="flex gap-4 p-4">
        {!isEditing ? (
          <>
            <p className="text-balance w-full text-sm font-medium">
              {phoneNumber || 'No phone number provided'}
            </p>
            <Button
              onClick={() => setIsEditing(true)}
              className="text-sm"
              variant={'secondary'}
            >
              Update Number
            </Button>
          </>
        ) : (
          <div className="flex flex-col gap-2 w-full">
            <Input
              type="text"
              value={newPhoneNumber}
              onChange={(e) => setNewPhoneNumber(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
              placeholder="Enter new phone number"
            />
            <div className="flex gap-2">
              <Button
                onClick={() => setIsEditing(false)}
                className="text-sm w-full bg-gray-300 text-black"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdatePhoneNumber}
                className="text-sm w-full bg-blue-500 text-white"
              >
                Submit
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ProfilePhoneNumber
