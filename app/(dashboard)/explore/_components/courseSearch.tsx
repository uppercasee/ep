'use client'

import { useSearchParams } from 'next/navigation'

const courseSearch = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  return (
    <div>
      <h1>Search Results for "{query}".</h1>
    </div>
  )
}

export default courseSearch
