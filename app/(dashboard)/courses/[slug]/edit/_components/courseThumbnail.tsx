'use client'

import { Button } from '@/components/ui/button'
import { updateThumbUrl } from '@/server/db/courses' // Server Action
import { EditIcon } from 'lucide-react'
import {
  CldImage,
  CldUploadWidget,
  type CloudinaryUploadWidgetInfo,
} from 'next-cloudinary'
import { useState } from 'react'
import { toast } from 'sonner'

interface CourseThumbnailProps {
  courseId: string
  thumbnail: string | null
}

const CourseThumbnail = ({ thumbnail, courseId }: CourseThumbnailProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [courseThumbUrl, setCourseThumbUrl] = useState(thumbnail)

  const toggleEdit = () => {
    setIsEditing((prev) => !prev)
  }

  const handleUploadSuccess = async (
    result: string | CloudinaryUploadWidgetInfo | undefined
  ) => {
    if (!result || typeof result === 'string') {
      console.error('Invalid result:', result)
      return
    }

    const publicId = result.public_id
    try {
      await updateThumbUrl({ courseId, url: publicId })
      setCourseThumbUrl(publicId)
      toast.success('Thumbnail updated successfully!')
    } catch (error) {
      toast.error('Failed to update thumbnail.')
      console.error('Error updating thumbnail:', error)
    } finally {
      toggleEdit()
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {isEditing ? (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>Thumbnail</div>
          <CldUploadWidget
            signatureEndpoint={'/api/sign-cloudinary-params'}
            uploadPreset="elearning_images"
            onSuccess={(result) => handleUploadSuccess(result?.info)}
          >
            {({ open }) => (
              <Button
                variant="secondary"
                onClick={() => {
                  open()
                }}
              >
                Upload an Image
              </Button>
            )}
          </CldUploadWidget>
          <Button variant="ghost" onClick={toggleEdit}>
            Cancel
          </Button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>Thumbnail</div>
          {courseThumbUrl ? (
            <CldImage
              src={courseThumbUrl}
              width="250"
              height="250"
              alt="Course Thumbnail"
              crop={{ type: 'fill' }}
              //TODO: placeholder blur
            />
          ) : (
            <div className="w-[250px] h-[250px] bg-gray-200 flex items-center justify-center text-gray-500">
              Upload a new Image.
            </div>
          )}
          <Button variant="ghost" onClick={toggleEdit} className="flex gap-1">
            <EditIcon />
            Edit
          </Button>
        </div>
      )}
    </div>
  )
}

export default CourseThumbnail
