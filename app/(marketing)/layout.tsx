import Navbar from './nav/navbar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <div className="px-4 md:px-16 mt-16">{children}</div>
    </>
  )
}
