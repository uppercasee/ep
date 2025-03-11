import { db } from '@/drizzle/db'
import { PostTable, ReplyTable } from '@/drizzle/schema'
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
// export const createPost = async (
//   title: string,
//   content: string,
//   author: string
// ) => {
//   await db.insert(PostTable).values({
//     title,
//     content,
//     author,
//   })
// }

// // To create a new reply for a post
// export const createReply = async (
//   content: string,
//   author: string,
//   postId: number
// ) => {
//   await db.insert(ReplyTable).values({
//     content,
//     author,
//     postId,
//   })
// }
