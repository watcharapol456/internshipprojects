import { defineConfig } from 'drizzle-kit'
import env from './env'

export default defineConfig({
 schema: "./db/schema/index.ts",
  dialect: 'postgresql',
  out: "./db/migrations",
    dbCredentials: {
    url: env.DB_URI,
  },
  verbose: true,
  strict: true,
})