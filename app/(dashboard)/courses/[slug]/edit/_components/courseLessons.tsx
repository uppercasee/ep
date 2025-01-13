import { getLessonsFromCourse } from '@/server/db/lessons'
import Lessons from './lessons'

interface CourseLessonsProps {
  courseId: string
}

const CourseLessons = async ({ courseId }: CourseLessonsProps) => {
  const lessons = await getLessonsFromCourse({ courseId })

  return <Lessons lessons={lessons} courseId={courseId} />
}

export default CourseLessons
