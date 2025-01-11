import { Types } from 'mongoose'
import { z } from 'zod'

export const courseZodSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  description: z.string().max(500, 'Description is too long').optional(),
  createdBy: z
    .string()
    .nonempty('CreatedBy is required')
    .refine((id) => Types.ObjectId.isValid(id), {
      message: 'CreatedBy must be a valid ObjectId',
    }),
  lessons: z.array(z.string()).optional(),
  students: z.array(z.string().nonempty()).default([]),
  category: z.string().min(1, 'Category is required'),
  isPublished: z.boolean().default(false),
  price: z.number().min(0, 'Price must be a positive number').optional(),
  thumbnail_url: z.string().url('Invalid URL for thumbnail').optional(),
  tags: z.array(z.string()).optional(),
})
