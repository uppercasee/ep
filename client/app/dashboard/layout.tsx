import Navbar from './_components/Navbar'

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
