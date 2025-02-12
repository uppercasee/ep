import { cookies } from 'next/headers'
import StudentDashboard from './student'
import TeacherDashboard from './teacher'

const Page = async () => {
  const mode = await getMode()
  return mode === 'teacher' ? <TeacherDashboard /> : <StudentDashboard />
}

export default Page

const getMode = async () => {
  const cookieStore = await cookies()
  return cookieStore.get('mode')?.value || 'student'
}
