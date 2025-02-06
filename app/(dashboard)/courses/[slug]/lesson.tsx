'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { RadioGroup } from '@/components/ui/radio-group'
import { getEntireCourse } from '@/features/courses/actions/getEntireCourse'
import { CldVideoPlayer } from '@/lib/cloudinary'
import { useQuery } from '@tanstack/react-query'
import { Menu } from 'lucide-react'
import { useState } from 'react'

interface LessonProps {
  slug: string
}

const Lesson = ({ slug }: LessonProps) => {
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const {
    data: course,
    isLoading,
    error,
  } = useQuery(['course', slug], () => getEntireCourse(slug), {
    enabled: !!slug,
  })

  if (isLoading) return <p>Loading...</p>
  if (error instanceof Error) return <p>Error: {error.message}</p>
  if (!course) {
    return <p>Course Not Found...</p>
  }
  const currentLesson = course?.lessons[selectedLessonIndex]
  console.log(course)

  // const handleLessonComplete = () => {
  //   const updatedLessons = course.lessons.map((lesson, index) =>
  //     index === selectedLessonIndex
  //       ? { ...lesson, isCompleted: !lesson.isCompleted }
  //       : lesson
  //   )
  //
  //   const allCompleted = updatedLessons.every((lesson) => lesson.isCompleted)
  //
  //   setCourse({
  //     ...course,
  //     lessons: updatedLessons,
  //     completed: allCompleted,
  //   })
  // }

  const handleNavigation = (direction: 'prev' | 'next') => {
    setSelectedLessonIndex((prev) => {
      if (direction === 'prev' && prev > 0) return prev - 1
      if (direction === 'next' && prev < course.lessons.length - 1)
        return prev + 1
      return prev
    })
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Mobile Navigation */}
      <div className="md:hidden border-b p-4 flex items-center justify-between">
        <Drawer open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[90vh]">
            <div className="h-full">
              <DrawerHeader className="text-left px-4 pt-4">
                <DrawerTitle>Course Content</DrawerTitle>
              </DrawerHeader>
              <div className="overflow-y-auto p-4">
                {course.lessons.map((lesson, index) => (
                  <Card
                    key={lesson.id}
                    onClick={() => {
                      setSelectedLessonIndex(index)
                      setIsMobileNavOpen(false)
                    }}
                    className={`cursor-pointer transition-colors mb-2 ${
                      index === selectedLessonIndex
                        ? 'bg-muted'
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    {/* <CardContent className="p-4"> */}
                    {/*   <div className="flex items-center justify-between"> */}
                    {/*     <span>{lesson.title}</span> */}
                    {/*     {lesson.isCompleted && ( */}
                    {/*       <CheckCircle className="h-4 w-4 text-green-500" /> */}
                    {/*     )} */}
                    {/*   </div> */}
                    {/*   <Badge variant="outline" className="mt-2"> */}
                    {/*     {lesson.content.type === 'video' ? 'Video' : 'Quiz'} */}
                    {/*   </Badge> */}
                    {/* </CardContent> */}

                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <span>{lesson.title}</span>
                      </div>
                      <Badge variant="outline" className="mt-2">
                        {lesson.type === 'video' ? 'Video' : 'Quiz'}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
        <span className="font-medium truncate">{currentLesson.title}</span>
      </div>
      {/* Desktop Lessons Index */}
      <Card className="hidden md:block w-full md:w-1/4 rounded-none border-r-0">
        <CardHeader>
          <CardTitle>Course Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 p-4">
          {course.lessons.map((lesson, index) => (
            <Card
              key={lesson.id}
              onClick={() => setSelectedLessonIndex(index)}
              className={`cursor-pointer transition-colors ${
                index === selectedLessonIndex ? 'bg-muted' : 'hover:bg-muted/50'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span>{lesson.title}</span>
                </div>
                <Badge variant="outline" className="mt-2">
                  {lesson.type === 'video' ? 'Video' : 'Quiz'}
                </Badge>
              </CardContent>
              {/* <CardContent className="p-4"> */}
              {/*   <div className="flex items-center justify-between"> */}
              {/*     <span>{lesson.title}</span> */}
              {/*     {lesson.isCompleted && ( */}
              {/*       <CheckCircle className="h-4 w-4 text-green-500" /> */}
              {/*     )} */}
              {/*   </div> */}
              {/*   <Badge variant="outline" className="mt-2"> */}
              {/*     {lesson.type === 'video' ? 'Video' : 'Quiz'} */}
              {/*   </Badge> */}
              {/* </CardContent> */}
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Lesson Content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="mx-auto space-y-6">
          <h1 className="text-xl md:text-2xl font-bold">
            {currentLesson.title}
          </h1>

          {currentLesson.type === 'video' ? (
            <div className="relative w-full h-full">
              <CldVideoPlayer
                width="1920"
                height="1080"
                src="samples/sea-turtle"
                colors={{
                  base: '#4a5568',
                  accent: '#3182ce',
                  text: '#ffffff',
                }}
                controls={true}
                showJumpControls={true}
                autoPlay="on-scroll"
                className="w-full aspect-video"
              />
            </div>
          ) : (
            <Card>
              <CardContent className="p-4 md:p-6 space-y-4">
                <h3 className="text-base md:text-lg font-semibold">
                  {/* {currentLesson?.quiz?.question} */}
                </h3>
                <RadioGroup className="space-y-2">
                  {/* {currentLesson?.quiz?.options.map((option, index) => ( */}
                  {/*   <div */}
                  {/*     key={option} */}
                  {/*     className="flex items-center space-x-2 p-2" */}
                  {/*   > */}
                  {/*     <RadioGroupItem value={option} id={`option-${index}`} /> */}
                  {/*     <Label */}
                  {/*       htmlFor={`option-${index}`} */}
                  {/*       className="text-sm md:text-base" */}
                  {/*     > */}
                  {/*       {option} */}
                  {/*     </Label> */}
                  {/*   </div> */}
                  {/* ))} */}
                </RadioGroup>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 md:flex-none"
                onClick={() => handleNavigation('prev')}
                disabled={selectedLessonIndex === 0}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                className="flex-1 md:flex-none"
                onClick={() => handleNavigation('next')}
                disabled={selectedLessonIndex === course.lessons.length - 1}
              >
                Next
              </Button>
            </div>

            {/* <div className="flex flex-col md:flex-row items-center gap-2"> */}
            {/*   {course.completed && ( */}
            {/*     <Badge variant="secondary" className="md:mr-2 text-center"> */}
            {/*       Course Completed */}
            {/*     </Badge> */}
            {/*   )} */}
            {/*   <Button */}
            {/*     variant={currentLesson.isCompleted ? 'default' : 'secondary'} */}
            {/*     className="w-full md:w-auto" */}
            {/*     onClick={handleLessonComplete} */}
            {/*   > */}
            {/*     {currentLesson.isCompleted ? 'Completed' : 'Mark Complete'} */}
            {/*   </Button> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lesson
