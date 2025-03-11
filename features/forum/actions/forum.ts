'use server'

import { db } from '@/drizzle/db'
import { PostTable, ReplyTable } from '@/drizzle/schema'
import { current_user } from '@/lib/server-utils'
import { getUserFromClerkId } from '@/server/db/users'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'

// To get all posts with replies
export const getPosts = async () => {
  const posts = await db
    .select()
    .from(PostTable)
    .leftJoin(ReplyTable, eq(ReplyTable.postId, PostTable.id))
    .execute()

  return posts
}

// To create a new post
export const createPost = async (title: string, content: string) => {
  const user = await current_user()

  if (!user?.id) {
    throw new Error('Not Authorized')
  }
  const author = user.username || 'John Doe'

  await db.insert(PostTable).values({
    title,
    content,
    author,
  })
}

// // To create a new reply for a post
export const createReply = async (content: string, postId: string) => {
  const user = await current_user()

  if (!user?.id) {
    throw new Error('Not Authorized')
  }

  const author = user.username || 'John Doe'

  await db.insert(ReplyTable).values({
    content,
    author,
    postId,
  })
}
