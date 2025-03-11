export * from './schema/badges'
export * from './schema/content'
export * from './schema/course'
export * from './schema/forum'
export * from './schema/lesson'
export * from './schema/payment'
export * from './schema/quest'
export * from './schema/quiz'
export * from './schema/user'

import type { PostTable, ReplyTable } from '@/drizzle/schema'
// Reviews, User_reviews
//
import type { InferModel } from 'drizzle-orm'

// Type for a Post
export type Post = InferModel<typeof PostTable>

// Type for a Reply
export type Reply = InferModel<typeof ReplyTable>
