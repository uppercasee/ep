'use server'

import { auth, currentUser } from '@clerk/nextjs/server'
import { cache } from 'react'

const authorization = cache(async () => {
  const { userId }: { userId: string | null } = await auth()
  return userId
})

const current_user = cache(async () => {
  const user = await currentUser()
  return user
})

export { authorization, current_user }
