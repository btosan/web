// prisma.config.ts  (or wherever you had this line)
import 'dotenv/config'   // ← this line loads your .env file automatically

import { defineConfig, env } from '@prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),   // now process.env.DATABASE_URL is available
  },
})