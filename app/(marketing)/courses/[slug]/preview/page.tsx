import Navbar from '@/app/(marketing)/nav/navbar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getCourseDetails } from '@/features/courses/actions/get_course_detail'
import { createPaymentRecord } from '@/features/payment/actions/create_payment'
import { CldImage } from '@/lib/cloudinary'
import { getCourse } from '@/server/actions/courseActions'
import { notFound, redirect } from 'next/navigation'
import EnrollNowButton from './button'

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
      <>
        <Navbar />
        <CourseViewPage id={course.id} />
      </>
    )
  } catch (error) {
    console.error('Error fetching course:', error)
    notFound()
  }
}

interface CourseViewProps {
  id: string
}

const CourseViewPage = async (props: CourseViewProps) => {
  const course = await getCourseDetails(props.id)
  if (!course) return notFound()

  const handleEnroll = async () => {
    if (course.price == null) {
      console.error('Course price is missing')
      return
    }

    const paymentId = await createPaymentRecord(props.id, course.price)

    redirect(`/payment/${paymentId}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-[1fr_300px] gap-8">
        {/* Main Content */}
        <div>
          <Card>
            <div className="relative h-64 w-full">
              <CldImage
                src={course.thumbnailUrl || '/placeholder.jpg'}
                alt={course.title}
                fill
                className="object-cover rounded-t-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
                crop="fill"
                gravity="auto"
                quality="auto"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-3xl">{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">About this course</h2>
                <p className="text-muted-foreground">{course.description}</p>
              </div>

              <Separator />

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Curriculum</h2>
                <ul className="space-y-3">
                  {course.lessons.map((lesson, index) => (
                    <li key={lesson.id} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-sm">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{lesson.title}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="text-2xl font-bold">Rs. {course.price}</div>
              <EnrollNowButton id={props.id} price={course.price} />
              <div className="text-sm text-muted-foreground text-center">
                30-Day Money-Back Guarantee
              </div>
            </CardContent>
          </Card>

          {course.tags && course.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Tags</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {course.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
