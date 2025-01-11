import { Types } from 'mongoose'
import { z } from 'zod'

export const userZodSchema = z.object({
  id: z.string().nonempty('Clerk ID is required'),
  myCourses: z
    .array(
      z.string().refine((id) => Types.ObjectId.isValid(id), {
        message: 'Each course ID must be a valid ObjectId',
      })
    )
    .optional(),
})
