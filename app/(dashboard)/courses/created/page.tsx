import CourseSkeleton from '@/components/skeletons/courseSkeleton'
import { Suspense } from 'react'
import CourseCards from './_components/coursecards'

const MyCoursesPage = async () => {
  return (
    <Suspense fallback={<CourseSkeleton />}>
      <CourseCards />
    </Suspense>
  )
}

export default MyCoursesPage
