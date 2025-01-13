import { Button } from '@/components/ui/button'
import { SearchBox } from '@/components/ui/searchBoxwithIcon'
import { Permission } from '@/lib/abac_permissions'
import { currentUser } from '@clerk/nextjs/server'
import { FlameIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import UserLogo from './userButton'

const Navbar = async () => {
  const user = await currentUser()
  if (!user?.id) {
    throw new Error('Not Authorized')
  }

  return (
    <header className="flex items-center justify-between px-4 py-2 w-full">
      <SearchBox />
      <div className="flex flex-row items-center justify-end gap-3">
        <Button variant={'ghost'} size={'sm'} className="flex gap-1">
          <FlameIcon /> 0
        </Button>
        <Permission userId={user.id} resource="courses" action="create">
          <Button asChild size={'sm'} variant={'secondary'} className="">
            <Link href="/courses/create">
              <PlusIcon className="md:mr-2" />{' '}
              <span className="hidden md:block">Create Course</span>
            </Link>
          </Button>
        </Permission>

        <UserLogo />
      </div>
    </header>
  )
}

export default Navbar
