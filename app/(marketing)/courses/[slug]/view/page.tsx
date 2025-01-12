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
    return <div>My Course: {slug}</div>
  } catch (error) {
    console.error('Error fetching course:', error)
    notFound()
  }
}
