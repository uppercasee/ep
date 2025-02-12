import CourseSkeleton from '@/components/skeletons/courseSkeleton'
import { Suspense } from 'react'
import MyCourseSection from '../dashboard/_components/myCourses'

const EnrolledPage = () => {
  return (
    <div className="">
      <Suspense fallback={<CourseSkeleton />}>
        <MyCourseSection />
      </Suspense>
    </div>
  )
}

export default EnrolledPage
