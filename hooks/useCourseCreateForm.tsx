import { createNewCourse } from '@/server/actions/courseActions'
import { navigate } from '@/server/actions/navigate'
import { useState } from 'react'

export function useCourseForm() {
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

  return { tags, setTags, formData, handleChange, handleSubmit }
}
