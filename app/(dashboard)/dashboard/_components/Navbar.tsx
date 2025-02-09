import { Button } from '@/components/ui/button'
import { SearchBox } from '@/components/ui/searchBoxwithIcon'
import { getRole } from '@/lib/abac'
import { Permission } from '@/lib/abac_permissions'
import { current_user } from '@/lib/server-utils'
import { FlameIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import UserLogo from './userButton'

const Navbar = async () => {
  const user = await current_user()
  if (!user?.id) {
    throw new Error('Not Authorized')
  }

  // const streak = getStreakforUser(user.id)
  const streak = 0

  return (
    <header className="flex items-center justify-between px-4 py-2 w-full">
      <SearchBox />
      <div className="flex flex-row items-center justify-end gap-3">
        <Button variant={'ghost'} size={'sm'} className="flex gap-1">
          Teachers Mode
        </Button>
        <Button variant={'ghost'} size={'sm'} className="flex gap-1">
          <FlameIcon /> {streak}
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
