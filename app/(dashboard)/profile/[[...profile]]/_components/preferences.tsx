import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'
import ProfileHeading from './profileHeading'
import ProfileSection from './profileSection'

const Preferences = () => {
  const [teachersMode, setTeachersMode] = useState(false)

  const handleClick = async () => {
    // const newTeachersMode = await updateTeachersMode(teachersMode)
    setTeachersMode(!teachersMode)
  }

  return (
    <>
      <ProfileHeading title="Preferences" />
      <Separator />
      <ProfileSection>
        <h1 className="flex w-64 items-center text-sm font-medium tracking-normal">
          Teachers Mode
        </h1>
        <div className="flex items-center justify-between text-balance p-0 pb-2.5 md:p-1">
          <p className="w-fit text-balance text-sm font-medium text-gray-400">
            Please fill everything in the personal details section first.
          </p>
          <Button
            color="white"
            onClick={handleClick}
            className="flex-shrink-0 py-1.5 pl-2.5 pr-3 text-sm font-medium"
          >
            {teachersMode ? 'Disable' : 'Enable'}
          </Button>
        </div>
      </ProfileSection>
      <Separator />
    </>
  )
}

export default Preferences
