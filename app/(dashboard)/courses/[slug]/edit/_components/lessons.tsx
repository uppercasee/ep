'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import type { LessonsTable } from '@/drizzle/schema'
import { createNewLesson, deleteLessonFromPosition } from '@/server/db/lessons'
import { CircleX, EditIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'sonner'

type Lesson = typeof LessonsTable.$inferInsert

interface LessonsProps {
  lessons: Lesson[]
  courseId: string
}

const Lessons = ({ lessons, courseId }: LessonsProps) => {
  const [newlessons, setLessons] = useState(lessons)

  const updatedlessons: Lesson = {
    title: 'Edit your lesson..',
    videoUrl: '',
    courseId,
    position: newlessons.length + 1,
    tier: 'free',
  }

  const addLesson = async () => {
    const optimisticLesson = { ...updatedlessons, id: 'optimistic-id' }
    setLessons((prevLessons) => [...prevLessons, optimisticLesson])

    try {
      await createNewLesson(updatedlessons)
      toast.success('New Lesson has been created...')
    } catch (error) {
      setLessons((prevLessons) =>
        prevLessons.filter((lesson) => lesson.id !== 'optimistic-id')
      )

      toast.error('Oops, something went wrong...')
      console.error(error)
    }
  }

  const deleteLesson = async (position: number) => {
    setLessons((prevLessons) => {
      const updatedLessons = prevLessons.filter(
        (lesson) => lesson.position !== position
      )

      const reindexedLessons = updatedLessons.map((lesson) => {
        if (lesson.position > position) {
          return { ...lesson, position: lesson.position - 1 }
        }
        return lesson
      })

      return reindexedLessons
    })

    try {
      await deleteLessonFromPosition({ position, courseId })

      toast.success('Lesson has been deleted successfully!!')
    } catch (error) {
      setLessons((prevLessons) => {
        const lessonToRestore = prevLessons.find(
          (lesson) => lesson.position === position
        )
        if (lessonToRestore) {
          const restoredLessons = [...prevLessons, lessonToRestore]
          return restoredLessons.sort((a, b) => a.position - b.position)
        }
        return prevLessons
      })

      toast.error('An error occurred while deleting the lesson.')
      console.error(error)
    }
  }

  return (
    <>
      <div className="border-t border-x flex flex-col items-center justify-center gap-4 py-1">
        <h2 className="text-lg font-semibold">
          You can make changes to your lessons here.
        </h2>
        {newlessons.map((lesson) => (
          <div
            key={lesson.position}
            className="w-full flex flex-col justify-between items-center px-4"
          >
            <div className="w-full flex justify-between items-center">
              <h3 className="text-lg">
                {lesson.position}. {lesson.title}
              </h3>
              <div className="flex gap-2 items-center justify-end ml-auto">
                <Badge>{lesson.tier}</Badge>
                <Link
                  href={`/courses/${courseId}/edit/lesson?lid=${lesson.id}`}
                >
                  <Button variant={'ghost'} className="flex gap-1 px-1">
                    <EditIcon />
                    Edit
                  </Button>
                </Link>
                <DeleteDialog lesson={lesson} deleteLesson={deleteLesson} />
              </div>
            </div>
            <Separator />
          </div>
        ))}
      </div>
      <Button onClick={addLesson}>Add a new Lesson</Button>
    </>
  )
}

export default Lessons

interface DeleteDialogProps {
  lesson: Lesson
  deleteLesson: (position: number) => void
}

const DeleteDialog = ({ lesson, deleteLesson }: DeleteDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant={'destructive_outline'}
          className="flex items-center justify-center gap-1 px-1"
          asChild
        >
          <div className="flex gap-1">
            <CircleX />
            Delete
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this lesson from our servers?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => deleteLesson(lesson.position)}
              variant={'destructive'}
            >
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
