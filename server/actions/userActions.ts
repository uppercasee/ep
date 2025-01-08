'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { createUser, deleteUser } from '../db/services/userService'

// import { revalidatePath } from 'next/cache'

export async function createUserAction(id: string) {
  try {
    const user = await createUser(id)

    const client = await clerkClient()
    const role = 'student'

    await client.users.updateUserMetadata(id, {
      privateMetadata: {
        role,
      },
    })

    // revalidatePath('/dashboard')
    return user
  } catch (error) {
    console.error('Error creating user:', error)
    throw new Error('Failed to create user')
  }
}

export async function deleteUserAction(id: string) {
  try {
    await deleteUser(id)
    // revalidatePath('/dashboard')
    return id
  } catch (error) {
    console.error('Error deleting user:', error)
    throw new Error('Failed to delete user')
  }
}

export async function toggleUserRole() {
  const { userId } = await auth()
  if (!userId) {
    return Error('Not Authorized')
  }
  const id = userId

  try {
    const client = await clerkClient()
    const user = await client.users.getUser(id)
    const currentRole = user.privateMetadata?.role || 'student'

    const newRole = currentRole === 'teacher' ? 'student' : 'teacher'

    await client.users.updateUserMetadata(id, {
      privateMetadata: {
        role: newRole,
      },
    })

    return 'success'
  } catch (error) {
    console.error('Failed to update user role:', error)
    throw new Error('Failed to update user role.')
  }
}
export async function getUserRole(): Promise<'teacher' | 'student'> {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Not Authorized')
  }

  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  const role = user.privateMetadata?.role || 'student'

  return role as 'teacher' | 'student'
}
