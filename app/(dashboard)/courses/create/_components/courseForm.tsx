'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  TagsInput,
  TagsInputClear,
  TagsInputInput,
  TagsInputItem,
  TagsInputLabel,
  TagsInputList,
} from '@/components/ui/tags-input'
import { Textarea } from '@/components/ui/textarea'
import { createNewCourse } from '@/server/actions/courseActions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters.')
    .max(100, 'Title must be less than 100 characters.'),
  description: z
    .string()
    .min(25, 'Description must be at least 25 characters.')
    .max(500, 'Description must be less than 500 characters.'),
  category: z.string().nonempty('Category is required.'),
  tags: z
    .array(z.string().min(3, 'Tags must have at least 3 characters.'))
    .min(1)
    .max(3, 'You can only add up to 3 tags.'),
  price: z
    .string()
    .regex(/^\d+$/, 'Price must be a valid number.')
    .nonempty('Price is required.'),
})

type CourseFormValues = z.infer<typeof formSchema>

const CourseForm = () => {
  const router = useRouter()

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      tags: [],
      price: '10',
    },
  })

  async function onSubmit(values: CourseFormValues) {
    const price = values.price ? Number.parseFloat(values.price) : 10
    const dataToSubmit = { ...values, price }

    console.log('Form data:', dataToSubmit)

    try {
      const id = await createNewCourse(dataToSubmit)
      router.push(`/courses/${id}/edit`)
    } catch (error) {
      toast.error(`${error}`)
      console.error('Error creating course:', error)
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-8 w-full lg:w-1/2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter course title" {...field} />
              </FormControl>
              <FormDescription>
                Give your course a clear and descriptive title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your course"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide a detailed description of your course.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Enter category" {...field} />
              </FormControl>
              <FormDescription>
                Select a category for your course.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <TagsInput
                className="w-full"
                value={field.value}
                onValueChange={(value) => field.onChange(value)}
                onValidate={(value) => value.length >= 3}
                onInvalid={(value) =>
                  field.value.length >= 3
                    ? toast.error('Up to 3 tags are allowed.')
                    : field.value.includes(value)
                      ? toast.error(`${value} already exists.`)
                      : toast.error(`${value} must have at least 3 characters.`)
                }
                max={3}
                editable
                addOnPaste
                delimiter=" "
              >
                <TagsInputLabel htmlFor="tags">Add Tags</TagsInputLabel>
                <TagsInputList>
                  {field.value.map((tag) => (
                    <TagsInputItem key={tag} value={tag}>
                      {tag}
                    </TagsInputItem>
                  ))}
                  <TagsInputInput placeholder="Add a tag" />
                </TagsInputList>
                <TagsInputClear>Clear</TagsInputClear>
              </TagsInput>
              <FormDescription>
                Add up to 3 tags for your course.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Enter course price" {...field} />
              </FormControl>
              <FormDescription>Set a price for your course.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  )
}

export default CourseForm
