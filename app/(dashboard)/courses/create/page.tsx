import { hasPermission } from '@/lib/abac'
import { current_user } from '@/lib/server-utils'
import { notFound, unauthorized } from 'next/navigation'
import CourseForm from './_components/courseForm'
import Header from './_components/header'

const NewCoursePage = async () => {
  const user = await current_user()

  if (!user?.id) {
    notFound()
  }

  const hasEditPermission = await hasPermission(user.id, 'courses', 'create')

  if (!hasEditPermission) {
    unauthorized()
  }

  return (
    <div className="px-4 py-4 md:px-12 flex flex-col gap-6 justify-center">
      <Header />
      <div className="flex flex-col lg:flex-row gap-6 md:gap-16">
        <CourseForm />
      </div>
    </div>
  )
}

export default NewCoursePage
