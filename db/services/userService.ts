import User from '@/db/models/users'
import connectToDatabase from '@/db/mongoose'
import type { Document } from 'mongoose'

export async function createUser(
  id: string,
  role = 'student'
): Promise<Document> {
  await connectToDatabase()
  try {
    const newUser = new User({ id, role })

    await newUser.save()
    console.log(`User ${id} created with role '${role}'`)

    return newUser
  } catch (err) {
    console.error('Error creating user:', err)
    throw new Error('Error occurred while creating user')
  }
}

export async function deleteUser(id: string): Promise<string> {
  await connectToDatabase()
  try {
    await User.deleteOne({ id })
    console.log(`User ${id} deleted successfully`)
    return id
  } catch (err) {
    console.error('Error deleting user:', err)
    throw new Error('Error occurred while deleting user')
  }
}
