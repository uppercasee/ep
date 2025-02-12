'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CldVideoPlayer } from 'next-cloudinary'
import { useState } from 'react'

const EditLessonPage = () => {
  // Toggle for free/paid lesson
  const [tier, setTier] = useState<'free' | 'paid'>('free')

  // Lesson title state & edit toggle
  const [lessonTitle, setLessonTitle] = useState('My Lesson Title')
  const [isEditingTitle, setIsEditingTitle] = useState(false)

  // Content selection state
  const [selectedContent, setSelectedContent] = useState('')

  // Dummy content options (replace with real data as needed)
  const contentOptions = [
    { id: '1', title: 'Introduction', type: 'video' },
    { id: '2', title: 'Chapter 1', type: 'video' },
    { id: '3', title: 'Chapter 2', type: 'quiz' },
  ]

  // Dummy video URL for Cloudinary video player
  const videoUrl = 'https://res.cloudinary.com/demo/video/upload/sample.mp4'

  // Handlers for title editing
  const startEditing = () => setIsEditingTitle(true)
  const cancelEditing = () => setIsEditingTitle(false)
  const submitTitle = () => {
    // (You can add saving logic here)
    setIsEditingTitle(false)
  }

  return (
    <div className="p-6">
      {/* Header with "Edit Lesson" on the left and toggle buttons on the right */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Lesson</h1>
        <div>
          <Button
            className={
              tier === 'free'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800'
            }
            onClick={() => setTier('free')}
          >
            Free
          </Button>
          <Button
            className={
              tier === 'paid'
                ? 'bg-blue-500 text-white ml-2'
                : 'bg-gray-200 text-gray-800 ml-2'
            }
            onClick={() => setTier('paid')}
          >
            Paid
          </Button>
        </div>
      </div>

      {/* Main layout: Left side for lesson details, Right side for video/quiz preview */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side */}
        <div className="flex-1 space-y-4">
          {/* Lesson Title Card */}
          <div className="border rounded-lg p-4 shadow">
            {isEditingTitle ? (
              <div className="flex flex-col gap-2">
                <Input
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  placeholder="Enter lesson title"
                />
                <div className="flex gap-2">
                  <Button onClick={submitTitle}>Submit</Button>
                  <Button variant="outline" onClick={cancelEditing}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{lessonTitle}</h2>
                <Button onClick={startEditing}>Edit</Button>
              </div>
            )}
          </div>

          {/* Content Selection Card */}
          <div className="border rounded-lg p-4 shadow">
            <Label className="block text-sm font-medium mb-2">
              Select Content
            </Label>
            <Select value={selectedContent} onValueChange={setSelectedContent}>
              <SelectTrigger>
                <SelectValue placeholder="Choose content" />
              </SelectTrigger>
              <SelectContent>
                {contentOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.title} ({option.type})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          <div className="border rounded-lg p-4 shadow">
            {/* Cloudinary Video Player (replace videoUrl with your actual video source) */}
            <CldVideoPlayer
              width="1920"
              height="1080"
              src="samples/sea-turtle"
              colors={{
                base: '#4a5568',
                accent: '#3182ce',
                text: '#ffffff',
              }}
              controls={true}
              showJumpControls={true}
              autoPlay="on-scroll"
              className="w-full aspect-video"
              logo={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditLessonPage
