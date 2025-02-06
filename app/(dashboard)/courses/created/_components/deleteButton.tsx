'use client'

import { Button } from '@/components/ui/button'
import { deleteCourse } from '@/server/db/courses'

interface deleteCourseButtonProps {
  id: string | undefined
}

const DeleteCourseButton = (props: deleteCourseButtonProps) => {
  const id = props.id
  if (!id) {
    return <></>
  }

  const handleDelete = async () => {
    await deleteCourse({ courseId: id })
    console.log(`${props.id} deleted!!`)
  }

  return (
    <Button variant={'destructive'} onClick={handleDelete}>
      Delete
    </Button>
  )
}

export default DeleteCourseButton
