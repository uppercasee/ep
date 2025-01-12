'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { navigate } from '@/server/actions/navigate'
import { useState } from 'react'
import { toast } from 'sonner'

const NewCoursePage = () => {
  const [tags, setTags] = useState<string[]>([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    tags: [],
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const price = formData.price ? Number.parseFloat(formData.price) : 10
    const dataToSubmit = { ...formData, tags, price }

    console.log('Form data:', dataToSubmit)

    try {
      const id = await createNewCourse(dataToSubmit)
      console.log('Course created successfully with id: ', id)
      navigate(`/courses/${id}/edit`)
    } catch (error) {
      console.error('Error creating course:', error)
    }
  }

  return (
    <div className="px-4 py-4 md:px-12 flex flex-col gap-6 justify-center">
      <Header />
      <div className="flex flex-col lg:flex-row gap-6 md:gap-16">
        <CourseForm
          formData={formData}
          handleChange={handleChange}
          tags={tags}
          setTags={setTags}
          handleSubmit={handleSubmit}
        />
        {/* <CourseContents /> */}
      </div>
    </div>
  )
}

const Header = () => (
  <div className="flex flex-col text-balance gap-0.5 pb-1">
    <div className="text-xl font-bold">Create a new course</div>
    <span className="text-muted-foreground">
      Get started by filling in the details and save your course!
    </span>
  </div>
)

const CourseForm = ({
  formData,
  handleChange,
  tags,
  setTags,
  handleSubmit,
}: {
  formData: {
    title: string
    description: string
    category: string
    price: string
  }
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  tags: string[]
  setTags: React.Dispatch<React.SetStateAction<string[]>>
  handleSubmit: (e: React.FormEvent) => void
}) => (
  <form
    id="course-form"
    className="flex flex-col gap-8 w-full lg:w-1/2"
    onSubmit={handleSubmit}
  >
    <FormField
      label="Title"
      id="title"
      value={formData.title}
      placeholder="Enter your course title here"
      description="Give your course a clear and descriptive title."
      handleChange={handleChange}
    />
    <FormField
      label="Description"
      id="description"
      value={formData.description}
      handleChange={handleChange}
      placeholder="Describe the key takeaways of your course"
      description="Provide a brief description of your course to give students an idea of what they will learn."
      isTextarea
    />
    <FormField
      label="Category"
      id="category"
      value={formData.category}
      placeholder="Select or type a course category"
      description="Choose a category that best describes the subject of your course."
      handleChange={handleChange}
    />
    <TagsInputField tags={tags} setTags={setTags} />
    <FormField
      label="Price"
      id="price"
      value={formData.price}
      placeholder="Enter the price for your course"
      description="Set the price for your course."
      handleChange={handleChange}
    />
    <Button form="course-form" type="submit">
      Create
    </Button>
  </form>
)

const FormField = ({
  label,
  id,
  value,
  handleChange,
  isTextarea = false,
  placeholder,
  description,
}: {
  label: string
  id: string
  value: string
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  isTextarea?: boolean
  placeholder?: string
  description?: string
}) => (
  <div className="flex flex-col gap-1.5">
    <Label>{label}</Label>
    {isTextarea ? (
      <Textarea
        rows={4}
        className="resize-none"
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder || `Course ${label.toLowerCase()}`}
      />
    ) : (
      <Input
        type="text"
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder || `Course ${label.toLowerCase()}`}
      />
    )}
    {description && (
      <div className="hidden text-muted-foreground text-sm">{description}</div>
    )}{' '}
  </div>
)

const TagsInputField = ({
  tags,
  setTags,
}: {
  tags: string[]
  setTags: React.Dispatch<React.SetStateAction<string[]>>
}) => (
  <TagsInput
    className="w-full"
    id="tags"
    value={tags}
    onValueChange={setTags}
    onValidate={(value) => value.length > 2}
    onInvalid={(value) =>
      tags.length >= 3
        ? toast.error('Up to 3 tags are allowed.')
        : tags.includes(value)
          ? toast.error(`${value} already exists.`)
          : toast.error(`${value} is not a valid tag.`)
    }
    max={3}
    editable
    addOnPaste
    delimiter=" "
  >
    <TagsInputLabel htmlFor="tags">Tags</TagsInputLabel>
    <TagsInputList>
      {tags.map((tag) => (
        <TagsInputItem key={tag} value={tag}>
          {tag}
        </TagsInputItem>
      ))}
      <TagsInputInput placeholder="Add a tag" />
    </TagsInputList>
    <div className="text-muted-foreground text-sm">
      Add up to 3 tags with at least 3 characters.
    </div>
    <TagsInputClear>Clear</TagsInputClear>
  </TagsInput>
)

// const CourseContents = () => (
//   <div className="flex flex-col gap-4 w-full lg:w-1/2">
//     <div className="text-md font-semibold">Contents</div>
//     <Button variant={'secondary'}>
//       <div className="flex gap-2">
//         <PlusIcon /> Add Lesson
//       </div>
//     </Button>
//   </div>
// )

export default NewCoursePage
