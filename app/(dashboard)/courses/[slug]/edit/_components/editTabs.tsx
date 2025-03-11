'use client'

import TabSkeleton from '@/components/skeletons/lessonTabSkeleton'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { updateCoursePublishedStatus } from '@/features/courses/actions/updatePublished'
import { getCourse } from '@/server/actions/courseActions'
import { getLessonsFromCourse } from '@/server/db/lessons'
import { useQuery } from '@tanstack/react-query'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import CourseCategory from './courseCategory'
import CourseDescription from './courseDescription'
import CoursePrice from './coursePrice'
import CourseTags from './courseTags'
import CourseThumbnail from './courseThumbnail'
import CourseTitle from './courseTitle'
import Lessons from './lessons'
import Resource from './resources'

interface EditTabsInterface {
  slug: string
}

const EditTabs = ({ slug }: EditTabsInterface) => {
  const {
    data: course,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['course', slug],
    queryFn: () => getCourse(slug),
  })

  if (isLoading) {
    return <TabSkeleton />
  }

  if (isError) {
    return <p>Error: {(error as Error).message}</p>
  }

  if (!course) {
    return <p>No course found.</p>
  }

  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2 md:gap-0 h-auto">
        <TabsTrigger value="basic">Basic Details</TabsTrigger>
        <TabsTrigger value="lessons">Lessons</TabsTrigger>
        <TabsTrigger value="resource">Resources</TabsTrigger>
        {/* <TabsTrigger value="syllabus">Curriculum</TabsTrigger> */}
      </TabsList>
      <TabsContent value="basic">
        <Header courseId={slug} isPublished={course.isPublished} />
        <div className="flex flex-col xl:flex-row md:gap-6 xl:gap-12">
          <div className="flex flex-col w-full xl:w-[50%] gap-6">
            <CourseTitle courseId={slug} title={course.title} />
            <Separator />
            <CourseThumbnail courseId={slug} thumbnail={course.thumbnailUrl} />
            <Separator />
            <CourseTags courseId={slug} tags={course.tags} />
            <Separator />
            <CoursePrice courseId={slug} price={course.price} />
            <Separator />
            <CourseCategory courseId={slug} category={course.category} />
            <Separator />
          </div>

          <div className="flex flex-col w-full xl:w-[50%]">
            <CourseDescription
              courseId={slug}
              description={course.description}
            />
            <Separator />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="lessons">
        <LessonTab id={course.id} />
      </TabsContent>
      {/* <TabsContent value="syllabus"> */}
      {/*   TODO: let user make sections and add certain lessons and quiz in that */}
      {/*   section */}
      {/* </TabsContent> */}
      <TabsContent value="resource">
        <Resource courseId={course.id} />
      </TabsContent>
    </Tabs>
  )
}

export default EditTabs

// const Header = ({
//   isPublished,
//   courseId,
// }: { isPublished: boolean | null | undefined; courseId: string }) => (
//   return <div>Test</div>
// )

interface HeaderProps {
  isPublished: boolean | undefined | null
  courseId: string
}

const Header = ({ isPublished, courseId }: HeaderProps) => {
  if (isPublished == null) {
    isPublished = false
  }
  const [pending, startTransition] = useTransition()
  const [published, setPublished] = useState(isPublished)

  async function togglePublished() {
    const previousState = published

    try {
      setPublished(!previousState)

      const updated = await updateCoursePublishedStatus(
        courseId,
        !previousState
      )
      console.log('Updated published status:', updated)

      toast.success(`Course ${!previousState ? 'published' : 'unpublished'}!`)
    } catch (error) {
      setPublished(previousState)
      toast.error('Failed to update course status.')
      console.error('Failed to update course status:', error)
    }
  }

  return (
    <div className="flex text-balance gap-4 pb-1 items-center my-6">
      <div className="text-xl font-bold">Edit your course</div>
      <span className="text-muted-foreground">
        Make changes to your course and save it.
      </span>
      <div className="flex ml-auto items-center gap-2 text-muted-foreground">
        <span>Published:</span>
        <Switch
          checked={published}
          onCheckedChange={() => startTransition(togglePublished)}
          disabled={pending}
        />
      </div>
    </div>
  )
}

interface LessonTab {
  id: string | null | undefined
}

const LessonTab = ({ id }: LessonTab) => {
  if (!id) {
    return <p>No lesson found.</p>
  }

  const {
    data: lessons,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['lessons', id],
    queryFn: () => getLessonsFromCourse({ courseId: id }),
    enabled: !!id,
  })

  if (!id) {
    return <p>No lesson found.</p>
  }

  if (isLoading) {
    return <TabSkeleton />
  }

  if (isError) {
    return <p>Error: {(error as Error).message}</p>
  }

  return (
    <div className="flex flex-col xl:flex-row gap-2">
      <div className="flex flex-col gap-2 w-full">
        <Lessons lessons={lessons} courseId={id} />
      </div>
    </div>
  )
}
