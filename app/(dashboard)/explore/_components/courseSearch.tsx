'use client'

import { useSearchParams } from 'next/navigation'

const courseSearch = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  return <div className="hidden">OMGGGG</div>
}

export default courseSearch
