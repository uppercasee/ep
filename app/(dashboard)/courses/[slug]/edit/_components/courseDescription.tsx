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
import { Textarea } from '@/components/ui/textarea'
import { updateDesc } from '@/server/db/courses'
import { zodResolver } from '@hookform/resolvers/zod'
import { EditIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

interface CourseDescriptionProps {
  description: string
  courseId: string
}

const formSchema = z.object({
  description: z
    .string()
    .max(500, {
      message: 'Description shouldnt exceed 500 characters.',
    })
    .min(50, {
      message: 'Description must be at least 50 characters long',
    }),
})

const CourseDescription = ({
  description,
  courseId,
}: CourseDescriptionProps) => {
  const [toggle, setToggle] = useState(true)
  const [courseDesc, setCourseDesc] = useState(description)

  const handleToggle = () => {
    setToggle((prevToggle) => !prevToggle)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const previousDesc = courseDesc

    try {
      setCourseDesc(values.description)

      handleToggle()
      const updatedDesc = await updateDesc({
        desc: values.description,
        courseId,
      })
      console.log('Updated description:', updatedDesc)
      toast.success('description updated Successfully!!')
    } catch (error) {
      setCourseDesc(previousDesc)
      toast.error('Failed to update description.')
      console.error('Failed to update description:', error)
    }
  }
  return (
    <>
      {toggle ? (
        <div className="flex text-balance gap-2 items-start md:items-center justify-between flex-col md:flex-row">
          <div className="pr-12">Description</div>
          <div className="text-lg pr-2">{courseDesc}</div>
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
          <div className="pr-12">Description</div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full justify-between gap-6 items-end"
            >
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Enter the description of your course</FormLabel>
                    <FormControl>
                      <Textarea rows={6} placeholder={courseDesc} {...field} />
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

export default CourseDescription
