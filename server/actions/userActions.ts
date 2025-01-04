'use server'

import { createUser, deleteUser } from '../db/services/userService'

// import { revalidatePath } from 'next/cache'

export async function createUserAction(id: string) {
  try {
    const user = await createUser(id)
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

// export async function updateUserRoleAction(id: string, role: string) {
//   try {
//     await updateUserRole(id, role)
//     // revalidatePath('/dashboard')
//   } catch (error) {
//     console.error('Error updating user role:', error)
//     throw new Error('Failed to update user role')
//   }
// }
