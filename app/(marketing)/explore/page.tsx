import { Skeleton } from '@/components/ui/skeleton'
import { Suspense } from 'react'
import CourseExplore from './_components/CourseExplore'
import CourseSearch from './_components/courseSearch'

const CourseExplorePage = () => {
  return (
    <div>
      <Suspense fallback={<Skeleton />}>
        <CourseSearch />
      </Suspense>
      <CourseExplore />
    </div>
  )
}

export default CourseExplorePage
