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
import { updatePrice } from '@/server/db/courses'
import { zodResolver } from '@hookform/resolvers/zod'
import { EditIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

interface CoursePriceProps {
  price: number | null
  courseId: string
}

const formSchema = z.object({
  price: z.number().min(1, {
    message: 'Price must be at least 1',
  }),
})

const CoursePrice = ({ price, courseId }: CoursePriceProps) => {
  const [toggle, setToggle] = useState(true)
  const [coursePrice, setCoursePrice] = useState(price ?? 0)

  const handleToggle = () => {
    setToggle((prevToggle) => !prevToggle)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: price ?? 0,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const previousPrice = coursePrice

    try {
      setCoursePrice(values.price)

      handleToggle()
      const updatedPrice = await updatePrice({
        price: values.price,
        courseId,
      })
      console.log('Updated price:', updatedPrice)
      toast.success('Price updated Successfully!!')
    } catch (error) {
      setCoursePrice(previousPrice)
      toast.error('Failed to update price.')
      console.error('Failed to update price:', error)
    }
  }

  return (
    <>
      {toggle ? (
        <div className="flex text-balance gap-2 items-start md:items-center justify-between flex-col md:flex-row">
          <div className="pr-24">Price</div>
          <div className="text-lg pr-2">Rs. {coursePrice}</div>
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
          <div className="pr-24">Price</div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full justify-between gap-6 items-end"
            >
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Enter the price of your course</FormLabel>
                    <FormControl>
                      <Input placeholder={`Rs. ${coursePrice}`} {...field} />
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

export default CoursePrice
