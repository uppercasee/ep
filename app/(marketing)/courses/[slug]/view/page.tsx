import Navbar from '@/app/(marketing)/nav/navbar'
import { getCourse } from '@/server/actions/courseActions'
import { notFound } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug

  try {
    const course = await getCourse(slug)

    if (!course) {
      notFound()
    }

    return (
      <>
        <Navbar />
        <div className="mt-14 mx-12">My Course: {slug}</div>
      </>
    )
  } catch (error) {
    console.error('Error fetching course:', error)
    notFound()
  }
}
