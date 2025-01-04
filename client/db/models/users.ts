'use server'
import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  id: string
  role: 'student' | 'teacher'
}

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['student', 'admin'],
      default: 'student',
    },
  },
  { timestamps: true }
)

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema)

export default User
