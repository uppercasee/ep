import { Button } from '@/components/ui/button'
import { SearchBox } from '@/components/ui/searchBoxwithIcon'
import { FlameIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import UserLogo from './userButton'

const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-4 py-2 w-full">
      <SearchBox />
      <div className="flex flex-row items-center justify-end">
        <Button variant={'ghost'} size={'sm'} className="flex gap-1">
          <FlameIcon /> 0
        </Button>
        <Button asChild size={'sm'} variant={'secondary'} className="">
          <Link href="/courses/create">
            <PlusIcon className="md:mr-2" />{' '}
            <span className="hidden md:block">Create Course</span>
          </Link>
        </Button>

        <UserLogo />
      </div>
    </header>
  )
}

export default Navbar
