import Course from '@/server/db/models/courses'
import connectToDatabase from '@/server/db/mongoose'
import { notFound } from 'next/navigation'

import { z } from 'zod'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  await connectToDatabase()
  const slug = (await params).slug

  try {
    const course = await Course.findById(slug)

    if (!course) {
      notFound()
    }

    return (
      <main className="flex flex-col gap-2">
        <Header isPublished={course.isPublished} />
        <h1 className="text-xl">{course.title}</h1>
        <p>{course.description}</p>
      </main>
    )
  } catch (error) {
    console.error('Error fetching course:', error)
    notFound()
  }
}
const Header = ({ isPublished }: { isPublished: boolean }) => (
  <>
    <div className="flex flex-col text-balance gap-0.5 pb-1">
      <div className="text-xl font-bold">Edit your course</div>
      <span className="text-muted-foreground">
        Make changes to your course and save it.
      </span>
      <span className="text-muted-foreground">
        Published: {isPublished ? 'Yes' : 'No'}
      </span>
    </div>
  </>
)
