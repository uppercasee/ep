'use client'

import { UserButton, UserProfile } from '@clerk/nextjs'
import { IdCardIcon, Settings2Icon } from 'lucide-react'
import PersonalDetails from './_components/personalDetails'
import Preferences from './_components/preferences'

const MePage = () => {
  return (
    <UserProfile>
      <UserButton.UserProfilePage
        label="Preferences"
        labelIcon={<Settings2Icon size={14} />}
        url="preferences"
      >
        <Preferences />
      </UserButton.UserProfilePage>

      <UserButton.UserProfilePage
        label="Personal Details"
        labelIcon={<IdCardIcon size={14} />}
        url="about"
      >
        <PersonalDetails />
      </UserButton.UserProfilePage>
    </UserProfile>
  )
}

export default MePage
