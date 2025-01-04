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
  },
  { timestamps: true }
)

const Course =
  mongoose.models.Course || mongoose.model<ICourse>('Course', courseSchema)

export default Course
