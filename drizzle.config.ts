import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'
import { env } from './lib/data/env/server'

export default defineConfig({
  out: './drizzle/sql/',
  schema: './drizzle/schema.ts',
  dialect: 'postgresql',
  strict: true,
  verbose: true,
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
