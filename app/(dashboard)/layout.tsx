import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import Navbar from './dashboard/_components/Navbar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
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
