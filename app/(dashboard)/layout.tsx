import Navbar from '@/components/nav/navbar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="dashboard">
      <Navbar />
      {children}
    </main>
  )
}
