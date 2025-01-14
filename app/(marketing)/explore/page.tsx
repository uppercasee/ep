import { Skeleton } from '@/components/ui/skeleton'
import { Suspense } from 'react'
import Navbar from '../nav/navbar'
import CourseExplore from './_components/CourseExplore'
import CourseSearch from './_components/courseSearch'

const CourseExplorePage = () => {
  return (
    <>
      <Navbar />
      <div className="mt-14 mx-12">
        <Suspense fallback={<Skeleton />}>
          {/* <CourseSearch /> */}
          <CourseExplore />
        </Suspense>
      </div>
    </>
  )
}

export default CourseExplorePage
