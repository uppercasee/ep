'use server'
import mongoose, { Schema, type Document } from 'mongoose'
import { z } from 'zod'

const userZodSchema = z.object({
  id: z.string().nonempty('Clerk ID is required'),
})

export type IUser = z.infer<typeof userZodSchema> & Document

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema)

export default User
