'use client'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useTeacherMode } from '@/hooks/useTeacherMode'

const TeacherModeToggle = () => {
  const { teachersMode, loading, toggleTeacherMode } = useTeacherMode()

  return (
    <>
      <h1 className="flex w-64 items-center text-sm font-medium tracking-normal">
        Teachers Mode
      </h1>
      <div className="flex items-center justify-between text-balance p-0 pb-2.5 md:p-1">
        <p className="w-fit text-balance text-sm font-medium text-gray-400">
          Please fill everything in the personal details section first.
        </p>

        {teachersMode === null || loading ? (
          <>
            <Skeleton className="h-10 w-20" /> {/* Button skeleton */}
          </>
        ) : (
          <Button
            color="white"
            onClick={toggleTeacherMode}
            className="flex-shrink-0 py-1.5 pl-2.5 pr-3 text-sm font-medium"
          >
            {teachersMode ? 'Disable' : 'Enable'}
          </Button>
        )}
      </div>
    </>
  )
}

export default TeacherModeToggle
