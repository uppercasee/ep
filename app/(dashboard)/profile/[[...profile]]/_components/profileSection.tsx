import type React from 'react'
import type { ReactNode } from 'react'

interface ProfileSectionProps {
  children: ReactNode
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ children }) => {
  return (
    <div className="flex flex-col justify-between gap-2 py-4 md:flex-row md:gap-6">
      {children}
    </div>
  )
}

export default ProfileSection
