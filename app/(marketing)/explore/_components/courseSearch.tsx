'use client'

import { useSearchParams } from 'next/navigation'

const courseSearch = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  return <div className="">Explore Page</div>
}

export default courseSearch
