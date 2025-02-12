'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateResourceTitle } from '@/features/content/actions/update_resource_title'
import { CldVideoPlayer } from '@/lib/cloudinary'
import { TrashIcon } from 'lucide-react'
import {
  CldUploadWidget,
  type CloudinaryUploadWidgetInfo,
} from 'next-cloudinary'
import { useActionState, useState } from 'react'
import { toast } from 'sonner'
import { uploadVideo } from '../actions/uploadVideo'

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

interface VideoResourceProps {
  resource: Resource
  courseId: string // Pass courseId from the URL slug
  onEditChange: (id: string, field: keyof Resource, value: string) => void
  onDelete: (id: string) => void
}

const VideoResource = ({
  resource,
  courseId,
  onEditChange,
  onDelete,
}: VideoResourceProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(resource.title)

  const handleVideoUploadSuccess = async (
    result: string | CloudinaryUploadWidgetInfo | undefined
  ) => {
    if (!result || typeof result === 'string') {
      console.error('Invalid result:', result)
      toast.error('Failed to upload video.')
      return
    }

    const publicId = result.public_id

    // Call the server action to save the video URL to the database
    const formData = new FormData()
    formData.append('courseId', courseId)
    formData.append('title', resource.title)
    formData.append('videoUrl', publicId)

    const response = await uploadVideo(
      { success: false, message: '', videoUrl: '' },
      formData
    )

    if (response.success) {
      onEditChange(resource.id, 'url', publicId)
      toast.success('Video uploaded and saved successfully!')
    } else {
      toast.error(response.message || 'Failed to save video metadata.')
    }
  }

  const handleEditTitle = () => {
    setIsEditing(true)
  }

  const handleSubmitTitle = async () => {
    const response = await updateResourceTitle(resource.id, newTitle)

    if (response.success) {
      onEditChange(resource.id, 'title', newTitle)
      toast.success(response.message)
      setIsEditing(false)
    } else {
      toast.error(response.message)
    }
  }

  const handleCancelEdit = () => {
    setNewTitle(resource.title)
    setIsEditing(false)
  }

  return (
    <div className="flex gap-6 justify-between md:flex-row flex-col">
      <div className="space-y-4 p-4 flex flex-col gap-1 w-full">
        {/* Title Field */}
        <div>
          <Label>Title</Label>
          {!isEditing ? (
            <div className="flex items-center">
              <span className="mr-2">{resource.title}</span>
              <Button
                variant="outline"
                onClick={handleEditTitle}
                className="w-fit"
              >
                Edit
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <Button
                variant="outline"
                onClick={handleSubmitTitle}
                className="w-fit"
              >
                Submit
              </Button>
              <Button
                variant="secondary"
                onClick={handleCancelEdit}
                className="w-fit"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>

        {/* Video Upload */}
        <Label>Video</Label>
        <CldUploadWidget
          uploadPreset="elearning_videos"
          onSuccess={(result) => handleVideoUploadSuccess(result?.info)}
        >
          {({ open }: { open: () => void }) => (
            <Button
              type="button"
              variant="outline"
              onClick={() => open()}
              className="w-fit"
            >
              Upload Video
            </Button>
          )}
        </CldUploadWidget>

        {/* Delete Button */}
        <Button
          variant="destructive"
          onClick={() => onDelete(resource.id)}
          className="mt-4 w-fit"
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-4 w-full">
        {resource.url && (
          <div className="relative max-w-lg">
            <Label className="block text-lg font-medium mb-2">
              Video Preview
            </Label>

            <CldVideoPlayer
              width="1920"
              height="1080"
              src={resource.url}
              colors={{
                base: '#4a5568',
                accent: '#3182ce',
                text: '#ffffff',
              }}
              controls={true}
              showJumpControls={true}
              autoPlay="on-scroll"
              logo={false}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default VideoResource
