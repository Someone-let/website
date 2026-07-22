import 'dotenv/config';

console.log("DATABASE_URL =", process.env.DATABASE_URL);

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './server/drizzle',
  schema: './server/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});