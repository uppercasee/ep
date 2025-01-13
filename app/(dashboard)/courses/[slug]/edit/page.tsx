import { Separator } from '@/components/ui/separator'
import { getCourse } from '@/server/actions/courseActions'
import { notFound } from 'next/navigation'
import CourseCategory from './_components/courseCategory'
import CourseDescription from './_components/courseDescription'
import CourseLessons from './_components/courseLessons'
import CoursePrice from './_components/coursePrice'
import CourseTags from './_components/courseTags'
import CourseThumbnail from './_components/courseThumbnail'
import CourseTitle from './_components/courseTitle'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug

  try {
    const course = await getCourse(slug)

    if (!course) {
      notFound()
    }

    return (
      <main className="flex flex-col gap-2">
        <Header isPublished={course.isPublished} />
        <div className="flex flex-col xl:flex-row gap-2">
          <div className="flex flex-col gap-2 w-full xl:w-1/2">
            <CourseTitle courseId={slug} title={course.title} />
            <Separator />
            <CourseDescription
              courseId={slug}
              description={course.description}
            />
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
          <Separator orientation="vertical" className="h-auto mx-2" />
          <div className="flex flex-col gap-2 w-full xl:w-1/2">
            <CourseLessons courseId={slug} />
            {/* <CourseDelete courseId={slug} /> */}
          </div>
        </div>
      </main>
    )
  } catch (error) {
    console.error('Error fetching course:', error)
    notFound()
  }
}
const Header = ({ isPublished }: { isPublished: boolean | null }) => (
  <>
    <div className="flex flex-col text-balance gap-0.5 pb-1">
      <div className="text-xl font-bold">Edit your course</div>
      <span className="text-muted-foreground">
        Make changes to your course and save it.
      </span>
      <span className="text-muted-foreground">
        {/* TODO: make a good selector ig idk */}
        Published: {isPublished ? 'Yes' : 'No'}
      </span>
    </div>
  </>
)
