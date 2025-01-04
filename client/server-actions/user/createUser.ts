'use server'
import User from '@/db/models/users'
import connectToDatabase from '@/db/mongoose'
import { currentUser } from '@clerk/nextjs/server'

export async function createUser(): Promise<any> {
  const user = await currentUser()

  if (!user) {
    return
  }
  const id = user.id
  await connectToDatabase()
  try {
    const newUser = new User({
      id,
      role: 'student',
    })

    await newUser.save()
    console.log(`User ${id} created with role 'student'`)

    return newUser
  } catch (err) {
    console.error('Error creating user:', err)
    throw new Error('Error occurred while creating user')
  }
}
