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
import { getEntireCourse } from '@/features/courses/actions/getEntireCourse'
import { getUserLessons } from '@/features/lessons/actions/get_user_lesson'
import { markLessonComplete } from '@/features/lessons/actions/mark_lesson_complete'
import { CldVideoPlayer } from '@/lib/cloudinary'
import { useQuery } from '@tanstack/react-query'
import { CheckCircle, Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface LessonProps {
  slug: string
  auth: boolean
}

type Question = {
  id: string | null
  text: string | null
  type: 'mcq' | 'truefalse' | null
  points: number | null
  answers: Answer[] // Added answers field
}

type Answer = {
  id: string | null
  text: string | null
  isCorrect: boolean | null
}

const Lesson = ({ slug, auth }: LessonProps) => {
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [lessonCompletion, setLessonCompletion] = useState<
    Record<string, boolean>
  >({})
  const [userAnswers, setUserAnswers] = useState<
    Record<string, string | undefined>
  >({})
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false)

  const {
    data: course,
    isLoading,
    error,
  } = useQuery(['course', slug], () => getEntireCourse(slug), {
    enabled: !!slug,
  })

  const { data: completionStatus } = useQuery(
    ['lessonCompletion', slug],
    () => (auth ? getUserLessons(slug) : []),
    {
      enabled: !!auth && !!slug,
    }
  )

  useEffect(() => {
    if (completionStatus) {
      const completionMap = completionStatus.reduce(
        (acc: Record<string, boolean>, lesson) => {
          acc[lesson.lessonId] = lesson.isCompleted ?? false
          return acc
        },
        {}
      )
      setLessonCompletion(completionMap)
    }
  }, [completionStatus])

  if (isLoading) return <p>Loading...</p>
  if (error instanceof Error) return <p>Error: {error.message}</p>
  if (!course) {
    return <p>Course Not Found...</p>
  }
  const currentLesson = course?.lessons[selectedLessonIndex]

  const handleLessonComplete = async () => {
    if (!auth) return

    setLessonCompletion((prev) => ({
      ...prev,
      [String(currentLesson.id)]: true,
    }))
    try {
      await markLessonComplete(currentLesson.id)
      toast.success('Lesson Completed!!')
    } catch (err) {
      console.error('Error marking lesson as complete:', err)
    }
  }

  const handleNavigation = (direction: 'prev' | 'next') => {
    setSelectedLessonIndex((prev) => {
      if (direction === 'prev' && prev > 0) return prev - 1
      if (direction === 'next' && prev < course.lessons.length - 1)
        return prev + 1
      return prev
    })
  }

  // Merging questions by ID
  const mergeQuestions = (questions: Question[]) => {
    const mergedQuestions: Record<string, Question> = {}

    for (const question of questions) {
      // Ensure question.id is not null
      if (question.id) {
        if (!mergedQuestions[question.id]) {
          mergedQuestions[question.id] = { ...question, answers: [] }
        }
        for (const answer of question.answers) {
          // Ensure answer.id is not null before using it
          if (answer.id) {
            mergedQuestions[question.id].answers.push(answer)
          }
        }
      }
    }

    return Object.values(mergedQuestions)
  }

  const mergedQuestions = mergeQuestions(currentLesson.questions || [])
  // Check answers and display result
  const handleSubmitQuiz = () => {
    setIsQuizSubmitted(true)
    const correctAnswers = mergedQuestions.map((question: Question) => {
      const userAnswer = userAnswers[question.id || '']
      const correct =
        question.answers.find((a: Answer) => a.isCorrect)?.id === userAnswer
      return { questionId: question.id, correct }
    })
    // Handle feedback after quiz submission
    const totalCorrect = correctAnswers.filter((ans) => ans.correct).length
    toast.info(
      `You got ${totalCorrect} out of ${mergedQuestions.length} correct!`
    )
  }

  const handleAnswerChange = (questionId: string | null, answerId: string) => {
    if (questionId) {
      setUserAnswers((prevAnswers: Record<string, string | undefined>) => ({
        ...prevAnswers,
        [questionId]: answerId,
      }))
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Mobile Navigation */}
      <div className="md:hidden border-b p-4 flex items-center justify-start gap-8">
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
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <span>{lesson.title}</span>
                        {lesson.id && lessonCompletion[String(lesson.id)] && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
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
                  {lesson.id && lessonCompletion[String(lesson.id)] && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </div>
                <Badge variant="outline" className="mt-2">
                  {lesson.type === 'video' ? 'Video' : 'Quiz'}
                </Badge>
              </CardContent>
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
                src={currentLesson.url}
                colors={{
                  base: '#4a5568',
                  accent: '#3182ce',
                  text: '#ffffff',
                }}
                controls={true}
                showJumpControls={true}
                autoPlay="on-scroll"
                className="w-full aspect-video"
                logo={false}
              />
            </div>
          ) : (
            <Card>
              <CardContent className="p-4 md:p-6 space-y-4">
                <h3 className="text-base md:text-lg font-semibold">Quiz</h3>
                <h4 className="font-medium text-sm">{currentLesson.title}</h4>
                {/* <p>Time Limit: {currentLesson.timeLimit} minutes</p> */}
                {/* <p>Passing Score: {currentLesson.passingScore}%</p> */}

                {mergedQuestions.map((question) => {
                  if (question.id) {
                    return (
                      <div key={question.id} className="mt-4 space-y-2">
                        <p className="font-semibold">{question.text}</p>
                        <ul>
                          {question.answers?.map((answer) => {
                            if (answer.id && question.id) {
                              return (
                                <li
                                  key={answer.id}
                                  className="flex items-center space-x-2"
                                >
                                  <input
                                    type="radio"
                                    name={`question-${question.id}`}
                                    onChange={() => {
                                      if (answer.id) {
                                        handleAnswerChange(
                                          question.id,
                                          answer.id
                                        )
                                      }
                                    }}
                                    checked={
                                      userAnswers[question.id] === answer.id
                                    }
                                  />
                                  <span>{answer.text}</span>
                                </li>
                              )
                            }
                            return null // If answer.id is null or undefined, skip this answer
                          })}
                        </ul>
                      </div>
                    )
                  }
                  return null // If question.id is null or undefined, skip this question
                })}

                <Button
                  className="mt-4 w-full"
                  onClick={handleSubmitQuiz}
                  disabled={isQuizSubmitted}
                >
                  {isQuizSubmitted ? 'Submitted' : 'Submit Quiz'}
                </Button>
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

            <div className="flex flex-col md:flex-row items-center gap-2">
              {lessonCompletion[String(currentLesson.id)] && (
                <Badge variant="secondary" className="md:mr-2 text-center">
                  Lesson Completed
                </Badge>
              )}
              <Button
                variant={
                  lessonCompletion[String(currentLesson.id)]
                    ? 'default'
                    : 'secondary'
                }
                className="w-full md:w-auto"
                onClick={handleLessonComplete}
              >
                {lessonCompletion[String(currentLesson.id)]
                  ? 'Completed'
                  : 'Mark Complete'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lesson
