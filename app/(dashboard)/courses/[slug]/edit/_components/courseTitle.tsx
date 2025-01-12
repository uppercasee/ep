'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { updateTitle } from '@/server/db/courses'
import { zodResolver } from '@hookform/resolvers/zod'
import { EditIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

interface CourseTitleProps {
  title: string
  courseId: string
}

const formSchema = z.object({
  title: z
    .string()
    .max(100, {
      message: 'Title shouldnt exceed 100 characters.',
    })
    .min(5, {
      message: 'Title must be at least 5 characters long',
    }),
})

const CourseTitle = ({ title, courseId }: CourseTitleProps) => {
  const [toggle, setToggle] = useState(true)
  const [courseTitle, setCourseTitle] = useState(title)

  const handleToggle = () => {
    setToggle((prevToggle) => !prevToggle)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const previousTitle = courseTitle

    try {
      setCourseTitle(values.title)

      handleToggle()
      const updatedTitle = await updateTitle({
        title: values.title,
        courseId,
      })
      console.log('Updated title:', updatedTitle)
      toast.success('Title updated Successfully!!')
    } catch (error) {
      setCourseTitle(previousTitle)
      toast.error('Failed to update title.')
      console.error('Failed to update title:', error)
    }
  }
  return (
    <>
      {toggle ? (
        <div className="flex text-balance gap-2 items-start md:items-center justify-between flex-col md:flex-row">
          <div className="pr-24">Title</div>
          <div className="text-lg pr-2">{courseTitle}</div>
          <Button
            variant={'ghost'}
            onClick={handleToggle}
            className="flex gap-1 px-1"
          >
            <EditIcon />
            Edit
          </Button>
        </div>
      ) : (
        <div className="flex text-balance gap-2 items-start md:items-center justify-between flex-col md:flex-row">
          <div className="pr-24">Title</div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full justify-between gap-6 items-end"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Enter the title of your course</FormLabel>
                    <FormControl>
                      <Input placeholder={courseTitle} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-3">
                <Button onClick={handleToggle} variant={'secondary'}>
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </>
  )
}

export default CourseTitle
