'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TrashIcon } from 'lucide-react'
import {
  CldUploadWidget,
  type CloudinaryUploadWidgetInfo,
} from 'next-cloudinary'
import { useActionState } from 'react'
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
  const [formState, formAction] = useActionState(uploadVideo, {
    success: false,
    message: '',
    videoUrl: '',
  })

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

  return (
    <div className="space-y-4 p-4 flex flex-col gap-1">
      {/* Title Field */}
      <div>
        <Label>Title</Label>
        <Input
          value={resource.title}
          onChange={(e) => onEditChange(resource.id, 'title', e.target.value)}
        />
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

      {/* Display the uploaded video URL */}
      {resource.url && (
        <div className="mt-2">
          <Label>Uploaded Video: {resource.url} </Label>
          <Input className="hidden" value={resource.url} readOnly />
        </div>
      )}

      {/* Delete Button */}
      <Button
        variant="destructive"
        onClick={() => onDelete(resource.id)}
        className="mt-4 w-fit"
      >
        <TrashIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default VideoResource
