import { drizzle } from 'drizzle-orm/neon-http';

const databaseUrl = process.env.DATABASE_URL;

export const isDbConfigured = Boolean(databaseUrl);

export const db = databaseUrl
  ? drizzle(databaseUrl, { logger: true })
  : null;
