'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputLabel,
  TagsInputList,
} from '@/components/ui/tags-input'
import { updateTags } from '@/server/db/courses'
import { zodResolver } from '@hookform/resolvers/zod'
import { EditIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

interface CourseTagsProps {
  tags: string[] | null
  courseId: string
}

const formSchema = z.object({
  tags: z
    .array(z.string().min(3, 'Tag must be at least 3 characters long'))
    .max(3, 'You can only add up to 3 tags'),
})

const CourseTags = ({ tags, courseId }: CourseTagsProps) => {
  const [toggle, setToggle] = useState(true)
  const [courseTags, setCourseTags] = useState(tags || [])

  const handleToggle = () => {
    setToggle((prevToggle) => !prevToggle)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tags: courseTags,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const previousTags = courseTags

    try {
      setCourseTags(values.tags)

      handleToggle()
      const updatedTags = await updateTags({
        tags: values.tags,
        courseId,
      })
      console.log('Updated tags:', updatedTags)
      toast.success('Tags updated successfully!')
    } catch (error) {
      setCourseTags(previousTags)
      toast.error('Failed to update tags.')
      console.error('Failed to update tags:', error)
    }
  }

  const handleTagChange = (newTags: string[]) => {
    setCourseTags(newTags)
  }

  return (
    <>
      {toggle ? (
        <div className="flex text-balance gap-2 items-start md:items-center justify-between flex-col md:flex-row">
          <div className="pr-24">Tags</div>
          <div className="flex flex-wrap gap-2">
            {courseTags?.map((tag) => (
              <Badge key={tag} variant={'secondary'} className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
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
          <div className="pr-24">Tags</div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full justify-between gap-6 items-end"
            >
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Enter the tags of your course</FormLabel>
                    <FormControl>
                      <TagsInput
                        className="w-full"
                        id="tags"
                        value={field.value}
                        onValueChange={(newTags: string[]) => {
                          field.onChange(newTags)
                          handleTagChange(newTags)
                        }}
                        onValidate={(value) => value.length > 2}
                        onInvalid={(value) =>
                          value.length < 3
                            ? toast.error(
                                'Tag must be at least 3 characters long.'
                              )
                            : courseTags.length >= 3
                              ? toast.error('Up to 3 tags are allowed.')
                              : courseTags.includes(value)
                                ? toast.error(`${value} already exists.`)
                                : toast.error(`${value} is not a valid tag.`)
                        }
                        max={3}
                        editable
                        addOnPaste
                        delimiter=" "
                      >
                        {/* <TagsInputLabel htmlFor="tags">Tags</TagsInputLabel> */}
                        <TagsInputList>
                          {courseTags.map((tag) => (
                            <TagsInputItem key={tag} value={tag}>
                              {tag}
                            </TagsInputItem>
                          ))}
                          <TagsInputInput placeholder="Add a tag" />
                        </TagsInputList>
                        <div className="text-muted-foreground text-sm">
                          Add up to 3 tags with at least 3 characters.
                        </div>
                      </TagsInput>
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

export default CourseTags
