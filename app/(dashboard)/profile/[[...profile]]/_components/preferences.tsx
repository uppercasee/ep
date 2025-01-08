import { Separator } from '@/components/ui/separator'
import TeacherModeToggle from '../_preferences/teachersMode'
import ProfileHeading from './profileHeading'
import ProfileSection from './profileSection'

const Preferences = () => {
  // const { userId } = await auth()

  return (
    <>
      <ProfileHeading title="Preferences" />
      <Separator />
      <ProfileSection>
        <TeacherModeToggle />
      </ProfileSection>
      <Separator />
    </>
  )
}

export default Preferences
