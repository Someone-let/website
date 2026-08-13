import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { and, eq } from "drizzle-orm"
import bcrypt from "bcryptjs"

import { db } from "./index"
import { accounts, users } from "./schema"

const hasGoogleConfig =
  Boolean(process.env.GOOGLE_ID) &&
  Boolean(process.env.GOOGLE_SECRET)

const authSecret =
  process.env.AUTH_SECRET ??
  process.env.NEXTAUTH_SECRET ??
  "dev-only-auth-secret-change-me"

const trustHost =
  process.env.AUTH_TRUST_HOST === "true" ||
  process.env.NEXTAUTH_URL !== undefined ||
  process.env.AUTH_URL !== undefined ||
  process.env.NODE_ENV === "production"

if (
  process.env.NODE_ENV === "production" &&
  !process.env.AUTH_SECRET &&
  !process.env.NEXTAUTH_SECRET
) {
  console.warn(
    "AUTH_SECRET (or NEXTAUTH_SECRET) is not set; using fallback secret. Set a real secret in production."
  )
}

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost,
  providers: [
    ...(hasGoogleConfig
      ? [
          Google({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
            allowDangerousEmailAccountLinking: true,
          }),
        ]
      : []),
    Credentials({
      name: "credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!db) return null

        const email = credentials?.email
        const password = credentials?.password

        if (!email || !password) return null

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, String(email)))
          .limit(1)

        if (!user || !user.password) return null

        const isValid = await bcrypt.compare(String(password), user.password)

        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!db || !account || account.provider !== "google") {
        return true
      }

      const email = user.email
      if (!email) {
        return false
      }

      try {
        const existingUser = await db
          .select({ id: users.id })
          .from(users)
          .where(eq(users.email, email))
          .limit(1)

        const userId = existingUser[0]?.id
          ? existingUser[0].id
          : (
              await db
                .insert(users)
                .values({
                  email,
                  name: user.name,
                  image: user.image,
                })
                .returning({ id: users.id })
            )[0]?.id

        if (!userId) {
          return false
        }

        const existingAccount = await db
          .select({ userId: accounts.userId })
          .from(accounts)
          .where(
            and(
              eq(accounts.provider, account.provider),
              eq(accounts.providerAccountId, account.providerAccountId)
            )
          )
          .limit(1)

        if (!existingAccount[0]) {
          const accountValues: typeof accounts.$inferInsert = {
            userId,
            type: account.type as typeof accounts.$inferInsert["type"],
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            refresh_token: account.refresh_token,
            access_token: account.access_token,
            expires_at: account.expires_at,
            token_type: account.token_type,
            scope: account.scope,
            id_token: account.id_token,
            session_state:
              account.session_state === undefined
                ? undefined
                : String(account.session_state),
          }

          await db.insert(accounts).values(accountValues)
        }

        return true
      } catch (error) {
        console.error("Google sign-in DB persistence failed", error)
        return false
      }
    },
    async jwt({ token, user }) {
      if (user && "role" in user) {
        token.role = (user as { role?: string | null }).role ?? "user"
      }

      if (db && token.email) {
        const [dbUser] = await db
          .select({ role: users.role })
          .from(users)
          .where(eq(users.email, String(token.email)))
          .limit(1)

        if (dbUser?.role) {
          token.role = dbUser.role
        }
      }

      if (!token.role) {
        token.role = "user"
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as { role?: string }).role =
          (token.role as string | undefined) ?? "user"
      }

      return session
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: authSecret,
})