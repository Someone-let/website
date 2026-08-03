'use server';

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server";
import { users } from "@/server/schema";

import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: db ? DrizzleAdapter(db) : undefined,

  session: {
    strategy: "database",
  },

  providers: [
   
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),

    // 🔐 EMAIL + PASSWORD LOGIN
    Credentials({
      name: "credentials",

      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },

      async authorize(credentials) {
        if (!db) return null;

        // 1. SAFE EXTRACTION (fixes your TS error)
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) return null;

        // 2. FIND USER
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, String(email)))
          .limit(1);

        if (!user || !user.password) return null;

        // 3. CHECK PASSWORD
        const isValid = await bcrypt.compare(
          String(password),
          user.password
        );

        if (!isValid) return null;

        // 4. RETURN AUTH USER
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
});