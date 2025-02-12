import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { current_user } from '@/lib/server-utils'
import Navbar from './dashboard/_components/Navbar'
import 'next-cloudinary/dist/cld-video-player.css'
import { StudentSidebar, TeacherSidebar } from '@/components/sidebar'
import { cookies } from 'next/headers'
import { unauthorized } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await current_user()

  if (!user?.id) {
    return unauthorized()
  }

  const mode = await getMode()

  return (
    <>
      <SidebarProvider>
        {mode === 'teacher' ? <TeacherSidebar /> : <StudentSidebar />}
        <main className="w-full">
          <div className=" flex flex-row">
            <SidebarTrigger />
            <Navbar />
          </div>
          <div className="px-8">{children}</div>
        </main>
      </SidebarProvider>
    </>
  )
}

const getMode = async () => {
  const cookieStore = await cookies()
  return cookieStore.get('mode')?.value || 'student' // Default to "student" if cookie is missing
}
