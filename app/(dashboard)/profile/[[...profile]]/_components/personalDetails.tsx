import { Separator } from '@/components/ui/separator'
import React from 'react'
import ProfileFullName from '../_preferences/full_name'
import ProfilePhoneNumber from '../_preferences/phone_number'
import ProfileHeading from './profileHeading'

const PersonalDetails = () => {
  return (
    <>
      <ProfileHeading title="Personal Detail" />
      <ProfileFullName />
      <Separator />
      <ProfilePhoneNumber />
      <Separator />
    </>
  )
}

export default PersonalDetails
