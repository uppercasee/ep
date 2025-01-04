import React from 'react'
import ProfileHeading from './profileHeading'
import { Divider } from '@mantine/core'
import ProfileSection from './profileSection'

const PersonalDetails = () => {
  return (
    <>
      <ProfileHeading title="Personal Detail" />
      <Divider />
      <ProfileSection>Name</ProfileSection>
      <Divider />
    </>
  )
}

export default PersonalDetails
