import { AppSidebar } from '@/components/app-sidebar'
import { AdminSidebar } from '@/components/sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { current_user } from '@/lib/server-utils'
import 'next-cloudinary/dist/cld-video-player.css'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await current_user()

  if (!user?.id) {
    throw new Error('Not Authorized')
  }
  return (
    <>
      <SidebarProvider>
        <AdminSidebar />
        <main className="w-full">
          <div className=" flex flex-row">
            <SidebarTrigger />
          </div>
          <div className="px-8">{children}</div>
        </main>
      </SidebarProvider>
    </>
  )
}
