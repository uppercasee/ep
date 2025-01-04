'use server'
import mongoose, { Schema, Document } from 'mongoose'
import { z } from 'zod'

export const tiers = z.enum(['free', 'paid'])

export const lessonZodSchema = z.object({
  title: z.string().nonempty('Title is required'),
  videoUrl: z.string().url('Valid URL is required'),
  progress: z.boolean().default(false),
  courseId: z.string().nonempty('Course ID is required'),
  tier: tiers,
})

export type ILesson = z.infer<typeof lessonZodSchema> & Document

const lessonSchema = new Schema<ILesson>(
  {
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    progress: { type: Boolean, default: false },
    courseId: { type: String, required: true, ref: 'Course' },
    tier: { type: String, enum: tiers.options, default: 'paid' },
  },
  { timestamps: true }
)

const Lesson =
  mongoose.models.Lesson || mongoose.model<ILesson>('Lesson', lessonSchema)
export default Lesson
