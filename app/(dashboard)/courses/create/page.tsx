'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

const NewCoursePage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
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

  const handleSubmit = async () => {
    // const result = await createCourse(formData) // Call the server action here
    // if (result.success) {
    //   // handle success (maybe navigate, show a success message, etc.)
    // } else {
    //   // handle errors
    // }
  }

  return (
    <div className="px-12 flex flex-col gap-6 justify-start ">
      <div className="flex justify-between items-center gap-6">
        <div className="text-balance">
          <div className="text-xl font-bold">Course Setup</div>
          <span className="text-muted-foreground">
            Complete all fields and save your course!!
          </span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 md:gap-16">
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <div className="flex-row items-center gap-1.5">
            <Label>Title</Label>
            <Input type="text" id="title" placeholder="Course Title" />
          </div>

          <div className="flex-row items-center gap-1.5">
            <Label>Description</Label>
            <Textarea
              rows={4}
              className="resize-none"
              id="title"
              placeholder="Course description"
            />
          </div>

          <div className="flex-row items-center gap-1.5">
            <Label>Category</Label>
            <Input type="text" id="title" placeholder="Course Category" />
          </div>
          <div className="flex-row items-center gap-1.5">
            <Label>Price</Label>
            <Input type="text" id="title" placeholder="Course Price" />
          </div>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  )
}

export default NewCoursePage
