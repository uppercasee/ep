import { env } from '@/lib/data/env/server'
import { neon } from '@neondatabase/serverless'
import type { InferSelectModel } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

const sql = neon(env.DATABASE_URL)
export const db = drizzle(sql, { schema: schema })

export type User = InferSelectModel<typeof schema.UsersTable>
export type Course = InferSelectModel<typeof schema.CoursesTable>
