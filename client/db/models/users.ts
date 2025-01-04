'use server'
import mongoose, { Schema, Document } from 'mongoose'
import { z } from 'zod'

export const roles = z.enum(['student', 'teacher', 'admin'])

export const userZodSchema = z.object({
  id: z.string().nonempty('Clerk ID is required'),
  role: roles,
})

export type IUser = z.infer<typeof userZodSchema> & Document

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: roles.options,
      default: 'student',
    },
  },
  { timestamps: true }
)

userSchema.index({ id: 1 })

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema)

export default User
