'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import CourseExplore from './_components/CourseExplore'

const CourseExplorePage = () => {
  const [searchResults, setSearchResults] = useState([])
  const searchParams = useSearchParams()
  const query = searchParams.get('q')

  return (
    <div>
      <h1>Search Results for "{query}".</h1>
      {/* <CourseExplore /> */}
    </div>
  )
}

export default CourseExplorePage
