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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import type { LessonsTable } from '@/drizzle/schema'
import { getContent } from '@/features/content/actions/getContent'
import { updateLessonContent } from '@/features/content/actions/updateLessonContent'
import {
  createNewLesson,
  deleteLessonFromPosition,
  updateLesson,
} from '@/server/db/lessons'
import { useQuery } from '@tanstack/react-query'
import { CircleX, EditIcon, PlusIcon } from 'lucide-react'
import {
  CldUploadWidget,
  CldVideoPlayer,
  type CloudinaryUploadWidgetInfo,
} from 'next-cloudinary'
import { useState } from 'react'
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
    tier: 'paid',
  }

  const addLesson = async () => {
    const optimisticLesson = { ...updatedlessons, id: 'optimistic-id' }
    setLessons((prevLessons) => [...prevLessons, optimisticLesson])

    try {
      const newLessonId = await createNewLesson(updatedlessons)

      setLessons((prevLessons) =>
        prevLessons.map((lesson) =>
          lesson.id === 'optimistic-id'
            ? { ...lesson, id: newLessonId }
            : lesson
        )
      )

      toast.success('New Lesson has been created...')
    } catch (error) {
      setLessons((prevLessons) =>
        prevLessons.filter((lesson) => lesson.id !== 'optimistic-id')
      )

      toast.error('Oops, something went wrong...')
      console.error(error)
    }
  }

  const editLesson = async (updatedLesson: Lesson) => {
    const originalLessons = [...newlessons]

    try {
      setLessons((prev) =>
        prev.map((lesson) =>
          lesson.id === updatedLesson.id ? updatedLesson : lesson
        )
      )

      await updateLesson(updatedLesson)
      toast.success('Lesson updated successfully')
    } catch (error) {
      setLessons(originalLessons)
      toast.error('Failed to update lesson')
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
                <Badge variant={lesson.tier === 'paid' ? 'paid' : 'free'}>
                  {lesson.tier}
                </Badge>
                <EditDialog lesson={lesson} onSave={editLesson} />
                <DeleteDialog lesson={lesson} deleteLesson={deleteLesson} />
              </div>
            </div>
            <Separator />
          </div>
        ))}
      </div>
      <Button onClick={addLesson} className="h-14" variant={'secondary'}>
        <PlusIcon />
        Add a new Lesson
      </Button>
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

interface EditDialogProps {
  lesson: Lesson
  onSave: (updatedLesson: Lesson) => void
}

const EditDialog = ({ lesson, onSave }: EditDialogProps) => {
  const {
    data: availableContent,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['availableContent', lesson.courseId],
    queryFn: () => getContent(lesson.courseId),
    staleTime: 1000 * 60 * 5,
  })

  console.log(availableContent)

  const [formData, setFormData] = useState({
    title: lesson.title,
    tier: lesson.tier || 'free',
    selectedContentId: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    if (!formData.selectedContentId) {
      toast.error('Please select content for the lesson.')
      return
    }
    if (!lesson.id) {
      toast.error('Failed to update lesson content.')
      return
    }

    e.preventDefault()
    try {
      await updateLessonContent(lesson.id, formData.selectedContentId)
      onSave({ ...lesson, ...formData })
      toast.success('Lesson updated successfully with new content!')
    } catch (error) {
      toast.error('Failed to update lesson content.')
      console.error(error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className="flex gap-1 px-1">
          <EditIcon />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Lesson</DialogTitle>
          <DialogDescription>
            Update the lesson details below. Changes will be saved immediately.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="block text-sm font-medium">Title</Label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Lesson title"
            />
          </div>

          <div className="space-y-2">
            <Label className="block text-sm font-medium">Lesson Content</Label>
            {isLoading ? (
              <p>Loading content...</p>
            ) : error ? (
              <p className="text-red-500">Failed to load content</p>
            ) : (
              <Select
                value={formData.selectedContentId}
                onValueChange={(value) =>
                  setFormData({ ...formData, selectedContentId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select content" />
                </SelectTrigger>
                <SelectContent>
                  {availableContent?.map((content) => (
                    <SelectItem key={content.id} value={content.id}>
                      {content.title} ({content.type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="space-y-2">
            <Label className="block text-sm font-medium">Tier</Label>
            <Select
              value={formData.tier}
              onValueChange={(value) =>
                setFormData({ ...formData, tier: value as 'free' | 'paid' })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <div className="flex gap-2">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
