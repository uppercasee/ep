import { hasPermission } from '@/lib/abac'
import { current_user } from '@/lib/server-utils'
import { getCourse } from '@/server/actions/courseActions'
import { notFound, unauthorized } from 'next/navigation'
import EditTabs from './_components/editTabs'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const user = await current_user()

  if (!user?.id) {
    notFound()
  }

  const hasEditPermission = await hasPermission(
    user.id,
    'courses',
    'edit',
    slug
  )

  if (!hasEditPermission) {
    unauthorized()
  }

  try {
    const course = await getCourse(slug)

    if (!course) {
      notFound()
    }

    return (
      <main className="flex flex-col gap-2">
        <EditTabs slug={slug} />
      </main>
    )
  } catch (error) {
    console.error('Error fetching course:', error)
    notFound()
  }
}
