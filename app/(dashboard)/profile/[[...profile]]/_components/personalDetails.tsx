import React from 'react'
import ProfileHeading from './profileHeading'
import ProfileSection from './profileSection'
import { Separator } from '@/components/ui/separator'

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
