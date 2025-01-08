'use server'
import mongoose, { Schema, type Document } from 'mongoose'
import { z } from 'zod'
import User from './users'

const courseZodSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  description: z.string().max(500, 'Description is too long').optional(),
  createdBy: z.string().nonempty('CreatedBy is required'),
  lessons: z.array(z.string()).optional(),
  students: z.array(z.string().nonempty()).default([]),
  category: z.string().min(1, 'Category is required'),
  isPublished: z.boolean().default(false),
  price: z.number().min(0, 'Price must be a positive number').optional(),
  thumbnail_url: z.string().url('Invalid URL for thumbnail').optional(),
})

export type ICourse = z.infer<typeof courseZodSchema> & Document

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    description: { type: String, maxlength: 500 },
    createdBy: {
      type: String,
      required: true,
      ref: 'User',
      validate: {
        validator: async (id: string) => {
          const user = await User.findById(id)
          return user?.role === 'teacher'
        },
        message: 'CreatedBy must reference a teacher',
      },
    },
    lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
    students: [{ type: String, ref: 'User' }],
    category: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      min: [0, 'Price must be a positive number'],
      required: false,
    },
    thumbnail_url: {
      type: String,
      validate: {
        validator: (url: string) => {
          try {
            new URL(url) // checks if this is a valid url
            return true
          } catch {
            return false
          }
        },
        message: 'Invalid URL for thumbnail',
      },
    },
  },
  { timestamps: true }
)

const Course =
  mongoose.models.Course || mongoose.model<ICourse>('Course', courseSchema)

export default Course
