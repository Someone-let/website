import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";
import { createId } from "@paralleldrive/cuid2";

export const RoleEnum = pgEnum("role", ["user", "admin"]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),

  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),

  password: text("password"),

  twoFactorEnabled: boolean("twoFactorEnabled").default(false),

  role: RoleEnum("role").default("user"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    type: text("type").$type<AdapterAccount["type"]>().notNull(),

    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),

    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const posts = pgTable("post", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image"),
  authorId: text("authorId").references(() => users.id, { onDelete: "set null" }),
  authorName: text("authorName"),
  category: text("category"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
});

export const likes = pgTable(
  "likes",
  {
    userId: text("user_id").notNull(),
    postId: text("post_id").notNull(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.userId, table.postId],
    }),
  })
);

export const comments = pgTable("comment", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  postId: text("postId").notNull().references(() => posts.id, { onDelete: "cascade" }),
  authorId: text("authorId").references(() => users.id, { onDelete: "set null" }),
  authorName: text("authorName"),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
});