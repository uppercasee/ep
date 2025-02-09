import Navbar from '@/app/(marketing)/nav/navbar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CldImage } from '@/lib/cloudinary'
import { getCourse } from '@/server/actions/courseActions'
import { notFound } from 'next/navigation'

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
        <CourseViewPage />
      </>
    )
  } catch (error) {
    console.error('Error fetching course:', error)
    notFound()
  }
}

// Mock data based on your schema
const mockCourse = {
  id: 'course_123',
  title: 'Mastering Web Development',
  description:
    'Become a full-stack web developer with this comprehensive course covering HTML, CSS, JavaScript, and more.',
  category: 'Web Development',
  isPublished: true,
  price: 19900, // in cents
  tags: ['web', 'javascript', 'react'],
  thumbnailUrl:
    'https://res.cloudinary.com/demo/image/upload/v1633456789/samples/landscapes/landscape-panorama.jpg',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  lessons: [
    { title: 'Introduction to Web Development' },
    { title: 'Setting Up Your Development Environment' },
    { title: 'HTML Fundamentals' },
    { title: 'HTML5 Semantic Elements' },
    { title: 'CSS Basics and Selectors' },
    { title: 'CSS Box Model and Layout' },
    { title: 'Responsive Design with Media Queries' },
    { title: 'Flexbox and Grid Layouts' },
    { title: 'JavaScript Basics: Variables and Data Types' },
    { title: 'JavaScript Functions and Scope' },
    { title: 'DOM Manipulation and Events' },
    { title: 'Asynchronous JavaScript and Promises' },
    { title: 'Introduction to ES6+ Features' },
    { title: 'Understanding APIs and Fetch' },
    { title: 'Introduction to React' },
    { title: 'React Components and Props' },
    { title: 'State Management in React' },
    { title: 'React Hooks and Context API' },
    { title: 'React Router and Navigation' },
    { title: 'Building and Deploying Your First Web App' },
    { title: 'Performance Optimization Techniques' },
    { title: 'Web Security Best Practices' },
    { title: 'Final Project: Building a Portfolio Website' },
  ],
}

const CourseViewPage = () => {
  const formattedPrice = (mockCourse.price / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-[1fr_300px] gap-8">
        {/* Main Content */}
        <div>
          <Card>
            <div className="relative h-64 w-full">
              <CldImage
                src={mockCourse.thumbnailUrl}
                alt={mockCourse.title}
                fill
                className="object-cover rounded-t-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
                crop="fill"
                gravity="auto"
                quality="auto"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-3xl">{mockCourse.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">About this course</h2>
                <p className="text-muted-foreground">
                  {mockCourse.description}
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Curriculum</h2>
                <ul className="space-y-3">
                  {mockCourse.lessons.map((lesson, index) => (
                    <li key={lesson.title} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-sm">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{lesson.title}</div>
                        <div className="text-sm text-muted-foreground">
                          15 min • Video
                        </div>
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
              <div className="text-2xl font-bold">{formattedPrice}</div>
              <Button className="w-full" size="lg">
                Enroll Now
              </Button>
              <div className="text-sm text-muted-foreground text-center">
                30-Day Money-Back Guarantee
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">This course includes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <div>• 5 hours on-demand video</div>
              <div>• 2 quizzes</div>
              <div>• Earn badges and rewards</div>
              <div>• Level up your skills with XP</div>
              <div>• Full lifetime access</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Tags</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {mockCourse.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
