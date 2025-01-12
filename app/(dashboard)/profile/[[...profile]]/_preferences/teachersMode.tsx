'use client'

import { Switch } from '@/components/ui/switch'
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
            <Switch checked={false} aria-readonly disabled />
          </>
        ) : (
          <div className="flex items-center ">
            <Switch
              checked={teachersMode}
              onCheckedChange={toggleTeacherMode}
              aria-readonly
            />
          </div>
        )}
      </div>
    </>
  )
}

export default TeacherModeToggle
