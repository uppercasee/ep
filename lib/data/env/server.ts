import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  emptyStringAsUndefined: true,
  server: {
    CLERK_SECRET_KEY: z.string(),
    CLERK_WEBHOOK_SECRET: z.string(),
    MONGODB_URI: z.string(),
    DATABASE_URL: z.string(),
    CLOUDINARY_API_SECRET: z.string(),
    CLOUDINARY_URL: z.string(),
  },
  experimental__runtimeEnv: process.env,
})
