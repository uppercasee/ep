import { Suspense } from 'react'
import CourseSearch from './_components/courseSearch'

const CourseExplorePage = () => {
  return (
    <div>
      <Suspense fallback={<p>Loading search results...</p>}>
        <CourseSearch />
      </Suspense>
      {/* <CourseExplore /> */}
    </div>
  )
}

export default CourseExplorePage
