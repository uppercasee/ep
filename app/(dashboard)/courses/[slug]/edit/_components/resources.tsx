import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PlusIcon, TrashIcon } from 'lucide-react'
import {
  CldUploadWidget,
  type CloudinaryUploadWidgetInfo,
} from 'next-cloudinary'
import { useState } from 'react'
import { toast } from 'sonner'

type ResourceType = 'video' | 'quiz'

interface Resource {
  id: string
  type: ResourceType
  title: string
  video?: string
  quizQuestion?: string
  quizOptions?: string[]
  correctAnswer?: string
}

interface ResourceProps {
  courseId: string
}

const Resource = ({ courseId }: ResourceProps) => {
  const [resources, setResources] = useState<Resource[]>([])
  const [editingResources, setEditingResources] = useState<{
    [key: string]: Resource
  }>({})

  const addResource = (type: ResourceType) => {
    const newResource: Resource = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      title: `New ${type === 'video' ? 'Video' : 'Quiz'} Resource`,
    }
    setResources([...resources, newResource])
    setEditingResources((prev) => ({
      ...prev,
      [newResource.id]: { ...newResource },
    }))
    toast.success('New resource added. Edit it below.')
  }

  const deleteResource = (id: string) => {
    setResources((prev) => prev.filter((res) => res.id !== id))
    setEditingResources((prev) => {
      const updated = { ...prev }
      delete updated[id]
      return updated
    })
    toast.success('Resource deleted successfully!')
  }

  const saveResource = (id: string) => {
    const updatedResource = editingResources[id]
    if (updatedResource) {
      setResources((prev) =>
        prev.map((res) => (res.id === id ? updatedResource : res))
      )
      toast.success('Resource saved successfully!')
    }
  }

  const discardChanges = (id: string) => {
    setEditingResources((prev) => {
      const updated = { ...prev }
      if (updated[id]) {
        updated[id] = {
          ...updated[id],
          title: resources.find((res) => res.id === id)?.title || '',
          video: resources.find((res) => res.id === id)?.video || '',
          quizQuestion:
            resources.find((res) => res.id === id)?.quizQuestion || '',
          quizOptions:
            resources.find((res) => res.id === id)?.quizOptions || [],
          correctAnswer:
            resources.find((res) => res.id === id)?.correctAnswer || '',
        }
      }
      return updated
    })
    toast.info('Changes discarded.')
  }

  const handleEditChange = (
    id: string,
    field: string,
    value: string | string[]
  ) => {
    setEditingResources((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }))
  }

  const handleVideoUploadSuccess = (
    result: string | CloudinaryUploadWidgetInfo | undefined,
    resourceId: string
  ) => {
    if (!result || typeof result === 'string') {
      console.error('Invalid result:', result)
      toast.error('Failed to upload video.')
      return
    }

    const publicId = result.public_id
    const videoUrl = publicId
    handleEditChange(resourceId, 'videoUrl', videoUrl)
    toast.success('Video uploaded successfully!')
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
                <span>
                  {editingResources[resource.id]?.title || resource.title}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 p-4 flex flex-col gap-1">
                {/* Title Field */}
                <div>
                  <Label>Title</Label>
                  <Input
                    value={editingResources[resource.id]?.title || ''}
                    onChange={(e) =>
                      handleEditChange(resource.id, 'title', e.target.value)
                    }
                  />
                </div>

                {resource.type === 'video' ? (
                  <>
                    <Label>Video: </Label>
                    <CldUploadWidget
                      uploadPreset="elearning_videos"
                      onSuccess={(result) =>
                        handleVideoUploadSuccess(result?.info, resource.id)
                      }
                    >
                      {({ open }: { open: () => void }) => (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => open()}
                        >
                          Upload Video
                        </Button>
                      )}
                    </CldUploadWidget>
                    {/* Display the uploaded video URL */}
                    {editingResources[resource.id]?.video && (
                      <div className="mt-2">
                        <Label>Uploaded Video:</Label>
                        <Input
                          value={editingResources[resource.id]?.video || ''}
                          readOnly
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <Label>Quiz Question</Label>
                    <Input
                      value={editingResources[resource.id]?.quizQuestion || ''}
                      onChange={(e) =>
                        handleEditChange(
                          resource.id,
                          'quizQuestion',
                          e.target.value
                        )
                      }
                    />
                    <Label>Options (comma separated)</Label>
                    <Input
                      value={
                        editingResources[resource.id]?.quizOptions?.join(
                          ', '
                        ) || ''
                      }
                      onChange={(e) =>
                        handleEditChange(
                          resource.id,
                          'quizOptions',
                          e.target.value.split(',').map((opt) => opt.trim())
                        )
                      }
                    />
                    <Label>Correct Answer</Label>
                    <Input
                      value={editingResources[resource.id]?.correctAnswer || ''}
                      onChange={(e) =>
                        handleEditChange(
                          resource.id,
                          'correctAnswer',
                          e.target.value
                        )
                      }
                    />
                  </>
                )}
                <div className="flex gap-2">
                  <Button onClick={() => saveResource(resource.id)}>
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => discardChanges(resource.id)}
                  >
                    Discard
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => deleteResource(resource.id)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default Resource
