import { Separator } from '@/components/ui/separator'
import React from 'react'
import ProfileHeading from './profileHeading'
import ProfileSection from './profileSection'

const PersonalDetails = () => {
  return (
    <>
      <ProfileHeading title="Personal Detail" />
      <Separator />
      <ProfileSection>Name</ProfileSection>
      <Separator />
    </>
  )
}

export default PersonalDetails
