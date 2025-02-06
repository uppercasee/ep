'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getContent } from '@/features/content/actions/getContent'
import QuizResource from '@/features/lessons/components/QuizResouce'
import VideoResource from '@/features/lessons/components/VideoResource'
import { useQuery } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

type ResourceType = 'video' | 'quiz' | null

interface Resource {
  id: string
  type: ResourceType
  title: string
  url?: string | null
  courseId?: string | null
  lessonId?: string | null
  quizId?: string | null
  createdAt?: Date
  updatedAt?: Date
}

interface ResourceProps {
  courseId: string
}

const Resource = ({ courseId }: ResourceProps) => {
  const [resources, setResources] = useState<Resource[]>([])

  const { data: fetchedResources = [], refetch } = useQuery({
    queryKey: ['resources', courseId],
    queryFn: () => getContent(courseId),
    onSuccess: (data) => setResources(data),
  })

  const addResource = (type: ResourceType) => {
    const newResource: Resource = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      title: `New ${type === 'video' ? 'Video' : 'Quiz'} Resource`,
    }
    setResources((prev) => [...prev, newResource])
    toast.success('New resource added. Edit it below.')
  }

  const deleteResource = async (id: string) => {
    try {
      // Call API to delete resource (not implemented here)
      await refetch()
      toast.success('Resource deleted successfully!')
    } catch (error) {
      toast.error('Failed to delete resource')
    }
  }

  const handleEditChange = (
    id: string,
    field: keyof Resource,
    value: string | string[]
  ) => {
    setResources((prev) =>
      prev.map((resource) =>
        resource.id === id ? { ...resource, [field]: value } : resource
      )
    )
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="border-t border-x flex flex-col items-center justify-center gap-4 py-4">
        <h2 className="text-lg font-semibold">
          You can add resources for this course here.
        </h2>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => addResource('video')}
          className="h-14"
          variant={'secondary'}
        >
          <PlusIcon />
          Add Video
        </Button>
        <Button
          onClick={() => addResource('quiz')}
          className="h-14"
          variant={'secondary'}
        >
          <PlusIcon />
          Add Quiz
        </Button>
      </div>

      <Accordion type="multiple" className="w-full">
        {resources.map((resource) => (
          <AccordionItem key={resource.id} value={resource.id}>
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Badge variant="free">{resource.type}</Badge>
                <span>{resource.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {resource.type === 'video' ? (
                <VideoResource
                  courseId={courseId}
                  resource={resource}
                  onEditChange={handleEditChange}
                  onDelete={deleteResource}
                />
              ) : (
                <span>TODO: QUIZZ</span>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default Resource
