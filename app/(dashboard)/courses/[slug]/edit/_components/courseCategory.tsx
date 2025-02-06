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
import { updateCategory } from '@/server/db/courses'
import { zodResolver } from '@hookform/resolvers/zod'
import { EditIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

interface CourseCategoryProps {
  category: string
  courseId: string
}

const formSchema = z.object({
  category: z
    .string()
    .min(3, {
      message: 'Category should be at least 3 characters long.',
    })
    .max(100, {
      message: 'Category should not exceed 100 characters.',
    }),
})

const CourseCategory = ({ category, courseId }: CourseCategoryProps) => {
  const [toggle, setToggle] = useState(true)
  const [courseCategory, setCourseCategory] = useState(category)

  const handleToggle = () => {
    setToggle((prevToggle) => !prevToggle)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const previousCategory = courseCategory

    try {
      setCourseCategory(values.category)

      handleToggle()
      const updatedCategory = await updateCategory({
        category: values.category,
        courseId,
      })
      console.log('Updated category:', updatedCategory)
      toast.success('Category updated Successfully!!')
    } catch (error) {
      setCourseCategory(previousCategory)
      toast.error('Failed to update category.')
      console.error('Failed to update category:', error)
    }
  }

  return (
    <>
      {toggle ? (
        <div className="flex text-balance gap-2 items-start sm:items-center justify-between flex-col sm:flex-row">
          <div className="pr-24">Category</div>
          <div className="text-lg pr-2">{courseCategory}</div>
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
          <div className="pr-24">Category</div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full justify-between gap-6 items-end"
            >
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Enter the category of your course</FormLabel>
                    <FormControl>
                      <Input placeholder={courseCategory} {...field} />
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

export default CourseCategory
