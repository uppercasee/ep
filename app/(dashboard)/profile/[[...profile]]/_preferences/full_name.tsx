'use client'

import { Button } from '@/components/ui/button'
import { useProfileFullName } from '@/hooks/useProfileFullName'
import { useState } from 'react'

const ProfileFullName = () => {
  const { fullName, loading, updateFullName } = useProfileFullName()

  const [isEditing, setIsEditing] = useState(false)
  const [newFullName, setNewFullName] = useState(fullName || '')

  const handleUpdateFullName = async () => {
    if (newFullName.trim()) {
      await updateFullName(newFullName.trim())
      setIsEditing(false)
    }
  }

  return (
    <>
      <h1 className="flex w-64 items-center text-sm font-medium tracking-normal mt-4">
        Full Name
      </h1>

      <div className="flex gap-4 p-4">
        {!isEditing ? (
          <>
            <p className="text-balance w-full text-sm font-medium">
              {fullName || 'No full name provided'}
            </p>
            <Button
              onClick={() => setIsEditing(true)}
              className="text-sm"
              variant={'secondary'}
            >
              Update Name
            </Button>
          </>
        ) : (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={newFullName}
              onChange={(e) => setNewFullName(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Enter full name"
            />
            <div className="flex gap-2">
              <Button
                onClick={() => setIsEditing(false)}
                className="text-sm w-full bg-gray-300 text-black"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateFullName}
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

export default ProfileFullName
