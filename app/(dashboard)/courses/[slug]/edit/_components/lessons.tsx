'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type { LessonsTable } from '@/drizzle/schema'
import { EditIcon } from 'lucide-react'
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
    title: 'Edit your lesson title',
    videoUrl: '',
    courseId,
    position: 1,
    tier: 'free',
  }

  const addLesson = () => {
    setLessons((prevLessons) => [...prevLessons, updatedlessons])
    toast.success('New Lesson has been created...')
  }

  return (
    <>
      <div className="border-t border-x flex flex-col items-center justify-center gap-4 py-2">
        {newlessons.map((lesson) => (
          <>
            <div
              key={lesson.id}
              className="w-full flex justify-between items-center px-4"
            >
              <h3 className="text-lg">{lesson.title}</h3>
              <div className="flex gap-2 items-center justify-end ml-auto">
                <Badge>{lesson.tier}</Badge>
                <Button variant={'ghost'} className="flex gap-1 px-1">
                  <EditIcon />
                  Edit
                </Button>
              </div>
            </div>
            <Separator key={lesson.id} />
          </>
        ))}
      </div>
      <Button onClick={addLesson}>Add a new Lesson</Button>
    </>
  )
}

export default Lessons
