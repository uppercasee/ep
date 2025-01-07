'use client'
import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
import { ArrowRight, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault()
    router.push(`/explore?q=${searchTerm}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(e)
    }
  }

  return (
    <div className="space-y-2 w-full sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
      {/* <Label htmlFor="input-26">Search for courses.....</Label> */}
      <div className="relative">
        <Input
          id="input-26"
          className="peer pe-9 ps-9"
          placeholder="Search for courses..."
          type="search"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <Search size={16} strokeWidth={2} />
        </div>
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Submit search"
          type="submit"
          onClick={handleSearch}
        >
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export { SearchBox }
