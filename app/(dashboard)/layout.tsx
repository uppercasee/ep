import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { currentUser } from '@clerk/nextjs/server'
import Navbar from './dashboard/_components/Navbar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()

  if (!user?.id) {
    throw new Error('Not Authorized')
  }
  return (
    <>
      <SidebarProvider>
        <AppSidebar userId={user.id} />
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
