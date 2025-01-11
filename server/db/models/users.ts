'use server'
import mongoose, { Schema, type Document } from 'mongoose'
import type { z } from 'zod'
import type { userZodSchema } from '../schema/userSchema'

export type IUser = z.infer<typeof userZodSchema> & Document

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    myCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  },
  { timestamps: true }
)

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema)

export default User
