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
const Header = ({ isPublished }: { isPublished: boolean | null }) => (
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
